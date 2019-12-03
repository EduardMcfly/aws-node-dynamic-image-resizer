import AWS from 'aws-sdk';
const { BUCKET = 'cosva' } = process.env;
export { BUCKET };
export const awsS3 = new AWS.S3();
