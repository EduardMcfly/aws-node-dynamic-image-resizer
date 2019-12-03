import AWS from 'aws-sdk';
const {
  BUCKET = 'cosva',
  IS_OFFLINE,
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
} = process.env;

export { BUCKET };
export const awsS3 = new AWS.S3(
  (IS_OFFLINE && {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  }) ||
    undefined,
);
