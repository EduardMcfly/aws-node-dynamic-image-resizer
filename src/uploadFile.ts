import { awsS3, BUCKET } from 'utils/awsS3';
import {
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from 'aws-lambda';
import fileType from 'file-type';
import { decrypt } from 'utils/encryption';

export const uploadFile: APIGatewayProxyHandler = async (
  event,
  context,
) => {
  const { body } = event;
  if (!body)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'body null' }),
    };

  const { file, key } = JSON.parse(decrypt(body));
  const buffer = new Buffer(file, 'base64');
  const fileMime = fileType(buffer);
  if (!fileMime) context.fail('The file is not');

  return awsS3
    .upload({
      Bucket: BUCKET,
      Key: key, // File name you want to save as in S3
      Body: buffer,
    })
    .promise()
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
};
