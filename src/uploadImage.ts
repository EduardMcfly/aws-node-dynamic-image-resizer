import { APIGatewayProxyHandler } from 'aws-lambda';
import resize from 'utils/resize';
import { convertInt, uploadDynamoDB } from 'utils';

export const uploadImage: APIGatewayProxyHandler = async event => {
  const { body } = event;
  if (!body)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'body null',
      }),
    };
  const { key, file, format, ...rest } = JSON.parse(body);

  const buffer = new Buffer(file, 'base64');
  // Parse to integer if possible
  const width = convertInt(rest.width);
  const height = convertInt(rest.height);

  const newFile = await resize({
    file: buffer,
    width,
    height,
    format,
  });

  // write the todo to the database
  return uploadDynamoDB({
    key: key,
    file: newFile.toString('base64'),
  });
};
