import { APIGatewayProxyHandler } from 'aws-lambda';
import { getFileBucket } from './utils/getFileBucket';
import { encrypt } from 'utils/encryption';

export const getFile: APIGatewayProxyHandler = async ({
  queryStringParameters,
}) => {
  const { file } = queryStringParameters;
  const { Body } = await getFileBucket(file);
  return {
    statusCode: 200,
    body: encrypt(JSON.stringify({ file: Body.toString('base64') })),
  };
};
