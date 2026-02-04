import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb';

// Configuration from environment
const config = {
  region: process.env.AWS_REGION || 'us-west-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};

const client = new DynamoDBClient(config);
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'mission-control-tasks';

const EXCLUDE_EPIC = 'epic-slack-integration';
const TARGET_COLUMN = 'Review';

async function getAllTasks() {
  const result = await docClient.send(new ScanCommand({
    TableName: TABLE_NAME,
    FilterExpression: 'begins_with(PK, :prefix) AND SK = :sk',
    ExpressionAttributeValues: {
      ':prefix': 'TASK#',
      ':sk': 'METADATA',
    },
  }));

  return result.Items || [];
}

async function updateTaskColumn(task, newColumn) {
  const updatedTask = {
    ...task,
    column: newColumn,
    updatedAt: new Date().toISOString(),
  };

  await docClient.send(new PutCommand({
    TableName: TABLE_NAME,
    Item: updatedTask,
  }));

  return updatedTask;
}

async function main() {
  console.log('🔍 Scanning all tasks...\n');
  
  const tasks = await getAllTasks();
  console.log(`Found ${tasks.length} total tasks\n`);

  // Filter out tasks from the Slack Integration epic
  const tasksToMove = tasks.filter(task => task.epicId !== EXCLUDE_EPIC);
  const excludedTasks = tasks.filter(task => task.epicId === EXCLUDE_EPIC);

  console.log(`📋 Tasks to move to "${TARGET_COLUMN}": ${tasksToMove.length}`);
  console.log(`🚫 Tasks excluded (${EXCLUDE_EPIC}): ${excludedTasks.length}\n`);

  if (excludedTasks.length > 0) {
    console.log('Excluded tasks:');
    excludedTasks.forEach(task => {
      console.log(`  - [${task.id}] ${task.title} (currently in: ${task.column})`);
    });
    console.log('');
  }

  let movedCount = 0;
  let alreadyInReview = 0;

  for (const task of tasksToMove) {
    if (task.column === TARGET_COLUMN) {
      alreadyInReview++;
      console.log(`⏭️  [${task.id}] "${task.title}" - already in ${TARGET_COLUMN}`);
    } else {
      const oldColumn = task.column;
      await updateTaskColumn(task, TARGET_COLUMN);
      movedCount++;
      console.log(`✅ [${task.id}] "${task.title}" - moved from "${oldColumn}" to "${TARGET_COLUMN}"`);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Summary:');
  console.log(`   Total tasks: ${tasks.length}`);
  console.log(`   Moved to Review: ${movedCount}`);
  console.log(`   Already in Review: ${alreadyInReview}`);
  console.log(`   Excluded (Slack Integration): ${excludedTasks.length}`);
  console.log('='.repeat(50));
}

main().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
