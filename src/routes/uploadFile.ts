/* import { awsS3, BUCKET } from 'utils/awsS3'; */
import { APIGatewayProxyHandler } from 'aws-lambda';
import pako from 'pako';
import { AES, enc } from 'crypto-js';
// Uploading files to the bucket

const KEY = 'test';
export const decrypt = (text: string) =>
  AES.decrypt(
    pako.inflate(text, {
      to: 'string',
    }),
    KEY,
  ).toString(enc.Utf8);

export const encrypt = (text: string) =>
  pako.deflate(AES.encrypt(text, KEY).toString(), {
    to: 'string',
  });

export const uploadFile: APIGatewayProxyHandler = (
  event,
  context,
  callback,
) => {
  const { body } = event;
  callback(null, {
    statusCode: 200,
    body: decrypt(body),
  });
  /*  awsS3.upload(
    {
      Bucket: BUCKET,
      Key: file, // File names you want to save as in S3
      Body: readStream,
    },
    function(err: any, data: any) {
      if (err) throw err;
      console.log(`File uploaded successfully. ${data.Location}`);
      resolve({
        id,
        filename: file,
      });
    },
  ); */
};
