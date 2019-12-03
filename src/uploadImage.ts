import { awsS3, BUCKET } from 'utils/awsS3';
import {
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from 'aws-lambda';
import fileType from 'file-type';
import { decrypt } from 'utils/encryption';
import resize from 'utils/resize';
import { convertInt } from 'utils/index';

export const uploadImage: APIGatewayProxyHandler = async (
  event,
  context,
  callback,
) => {
  const { body } = event;
  if (!body)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'body null',
      }),
    };
  const { key, file, format, ...rest } = JSON.parse(decrypt(body));

  const buffer = new Buffer(file, 'base64');
  // Parse to integer if possible
  const width = convertInt(rest.width);
  const height = convertInt(rest.height);

  const fileMime = fileType(buffer);
  const Body = await resize({ file: buffer, width, height, format });
  if (!fileMime) context.fail('The file is not');

  return awsS3
    .upload({
      Bucket: BUCKET,
      Key: key, // File name you want to save as in S3
      Body,
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
