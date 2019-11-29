import {
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from 'aws-lambda';
import resize from '../utils/resize';
import { getFileBucket } from '../utils/getFileBucket';

export const getImage: APIGatewayProxyHandler = async ({
  queryStringParameters,
}): Promise<APIGatewayProxyResult> => {
  const { format, file } = queryStringParameters;
  // Parse to integer if possible
  const width = parseInt(queryStringParameters.width);
  const height = parseInt(queryStringParameters.height);
  if (!file) {
    return { statusCode: 500, body: 'Not autorized' };
  } else {
    const { Body } = await getFileBucket(file);
    if (Body instanceof Buffer) {
      const res = await resize({
        file: Body,
        format,
        width: (!isNaN(width) && width) || undefined,
        height: (!isNaN(height) && height) || undefined,
      })
        .then(
          (image): APIGatewayProxyResult => ({
            statusCode: 200,
            headers: {
              'content-type': `image/${format || 'jpeg'} `,
            },
            body: image.toString('base64'),
            isBase64Encoded: true,
          }),
        )
        .catch(
          (e): APIGatewayProxyResult => {
            return {
              statusCode: 500,
              body: e.message,
            };
          },
        );
      return res;
    } else {
      return { statusCode: 500, body: '' };
    }
  }
};
