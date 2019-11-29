import { awsS3, BUCKET } from './awsS3';

export const getFileBucket = (Key: string) => {
  return awsS3
    .getObject({
      Bucket: BUCKET,
      Key,
    })
    .promise();
};
