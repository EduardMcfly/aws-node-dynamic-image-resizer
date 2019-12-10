# serverless-dynamic-image-resizer

A template to load any file, and if it is an image, it can be obtained with a dynamic size.

## Installation

* `git clone https://github.com/andres112013/aws-node-dynamic-image-resizer.git`
* `cd aws-node-dynamic-image-resizer`
* `npm install`
* `npm start`
* visit `http://localhost:4000` for the API endpoint

#### custom.yml file

Since this boilerplate project is using AWS S3 and DynamoDB, 
if you are going to use [*serverless-offline*](https://www.npmjs.com/package/serverless-offline) you must configure the following environment variables

```
dev:
    .....
    ACCESS_KEY_ID=xxxxx-xxxxx-xxxxx-xxxxx
    SECRET_ACCESS_KEY=xxxxx-xxxxx-xxxxx-xxxxx
    .....
```
