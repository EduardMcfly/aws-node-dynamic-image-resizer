import { APIGatewayProxyHandler } from 'aws-lambda';
import { uploadDynamoDB } from 'utils';

export const uploadFile: APIGatewayProxyHandler = async event => {
  const { body } = event;
  if (!body)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'body null' }),
    };

  const { file, key } = JSON.parse(body);

  return uploadDynamoDB({
    key, // File name you want to save as in S3
    file,
  });
};
