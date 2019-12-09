import AWS from 'aws-sdk'; // eslint-disable-line import/no-extraneous-dependencies

let options = {};

// connect to local DB if running offline
if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:7000',
    accessKeyId: 'DEFAULT_ACCESS_KEY', // needed if you don't have aws credentials at all in env
    secretAccessKey: 'DEFAULT_SECRET', // needed if you don't have aws credentials at all in env
  };
}

export const dynamoDB = new AWS.DynamoDB.DocumentClient(options);
