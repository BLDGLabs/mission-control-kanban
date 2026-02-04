import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

// Configuration - uses Vite env vars in browser
const config = {
  region: import.meta.env.VITE_AWS_REGION || 'us-west-2',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
};

const client = new DynamoDBClient(config);
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = 'miti-worker-status';

/**
 * Get the latest Miti worker status entry
 */
export async function getLatestMitiStatus() {
  const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
  
  const result = await docClient.send(new ScanCommand({
    TableName: TABLE_NAME,
    FilterExpression: '#ts > :minTime',
    ExpressionAttributeNames: {
      '#ts': 'timestamp'
    },
    ExpressionAttributeValues: {
      ':minTime': oneDayAgo
    }
  }));
  
  // Get the latest entry by timestamp
  const items = result.Items || [];
  if (items.length === 0) return null;
  
  // Sort by timestamp descending and get the first one
  items.sort((a, b) => b.timestamp - a.timestamp);
  return items[0];
}
