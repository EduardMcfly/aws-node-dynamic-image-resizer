import { APIGatewayProxyResult } from 'aws-lambda';
import { awsS3, BUCKET } from './awsS3';
import { dynamoDB } from './dynamoDB';

// fetch todo from the Bucket
export const getFileBucket = (Key: string) =>
  awsS3
    .getObject({
      Bucket: BUCKET,
      Key,
    })
    .promise();

// fetch todo from the database
export const getFileDynamoDB = (Key: string) =>
  dynamoDB
    .get({
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        id: Key,
      },
    })
    .promise()
    .then(e => {
      const { file } = e.Item;
      return { Body: new Buffer(file, 'base64') };
    });

export const makeResult = (
  promise: Promise<any>,
): Promise<APIGatewayProxyResult> =>
  promise
    .then(
      (): APIGatewayProxyResult => ({
        statusCode: 200,
        body: 'success',
      }),
    )
    .catch(
      (e: Error): APIGatewayProxyResult => ({
        statusCode: 500,
        body: e.message,
      }),
    );

interface UploadParams<T = string> {
  key: string;
  file: T;
}

export const uploadS3 = ({
  key, // File name you want to save as in S3
  file,
}: UploadParams<Buffer>) =>
  makeResult(
    awsS3
      .upload({
        Bucket: BUCKET,
        Key: key,
        Body: file,
      })
      .promise(),
  );

export const uploadDynamoDB = ({ key, file }: UploadParams) => {
  const timestamp = new Date().getTime();
  const buffer = new Buffer(file, 'base64');
  return makeResult(
    dynamoDB
      .put({
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
          id: key,
          file: buffer,
          createdAt: timestamp,
          updatedAt: timestamp,
        },
      })
      .promise(),
  );
};

export const convertInt = (text: string): number | undefined => {
  const number = parseInt(text);
  return (!isNaN(number) && number) || undefined;
};
