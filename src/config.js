// Runtime config - loaded from window object set by Amplify
export const config = {
  aws: {
    region: window._env_?.VITE_AWS_REGION || import.meta.env.VITE_AWS_REGION || 'us-west-2',
    accessKeyId: window._env_?.VITE_AWS_ACCESS_KEY_ID || import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: window._env_?.VITE_AWS_SECRET_ACCESS_KEY || import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
  dynamodb: {
    tableName: window._env_?.VITE_DYNAMODB_TABLE_NAME || import.meta.env.VITE_DYNAMODB_TABLE_NAME || 'mission-control-tasks',
  },
};
