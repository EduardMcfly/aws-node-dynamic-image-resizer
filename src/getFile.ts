import { APIGatewayProxyHandler } from 'aws-lambda';
import { getFileDynamoDB } from './utils';

export const getFile: APIGatewayProxyHandler = async ({
  queryStringParameters,
}) => {
  const { file } = queryStringParameters;
  const { Body } = await getFileDynamoDB(file);

  return {
    statusCode: 200,
    body: JSON.stringify({ file: Body.toString('base64') }),
  };
};
