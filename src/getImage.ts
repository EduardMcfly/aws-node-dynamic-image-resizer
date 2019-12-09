import {
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from 'aws-lambda';
import resize from 'utils/resize';
import { getFileDynamoDB, convertInt } from 'utils';

export const getImage: APIGatewayProxyHandler = async ({
  queryStringParameters: parameters,
}): Promise<APIGatewayProxyResult> => {
  const { file, format } = parameters;

  // Parse to integer if possible
  const width = convertInt(parameters.width);
  const height = convertInt(parameters.height);
  if (!file) {
    return { statusCode: 500, body: 'Not autorized' };
  } else {
    const { Body } = await getFileDynamoDB(file);
    if (Body instanceof Buffer) {
      return resize({
        file: Body,
        format,
        width,
        height,
      })
        .then(
          (image): APIGatewayProxyResult => ({
            statusCode: 200,
            body: JSON.stringify({
              file: image.toString('base64'),
            }),
          }),
        )
        .catch(
          ({ message: body }): APIGatewayProxyResult => {
            return {
              statusCode: 500,
              body,
            };
          },
        );
    } else {
      return { statusCode: 500, body: '' };
    }
  }
};
