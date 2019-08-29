/* eslint-disable no-tabs */
const AWS = require('aws-sdk');

const batchWriteRecordsLimit = 25;
const querySafeBatchLimit = 1000;

AWS.config.update({ region: 'us-east-1' });
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

class DynamoSvc {
  // static async batchPutIntoDynamoDb(data, tableName, waitTime = 10000) {
  static async batchPutIntoDynamoDb(data, tableName) {
    try {
      const batchArray = data.splice(0, batchWriteRecordsLimit);
      const marshalledRequest = {
        RequestItems: {
          [tableName]: [],
        },
      };
      const parallelPromiseArray = [];
      for (let i = 0; i < batchArray.length; i += 1) {
        const marshalled = AWS.DynamoDB.Converter.marshall(batchArray[i]);
        marshalledRequest.RequestItems[tableName].push({ PutRequest: { Item: marshalled } });
      }
      console.log(marshalledRequest);
      parallelPromiseArray.push(dynamodb.batchWriteItem(marshalledRequest).promise());

      // after the write data is batched into promises; fire all the promises off in parallel

      const result = await Promise.all(parallelPromiseArray);
      // if (result.UnprocessedItems.length > 1) {
      //   // Handle unprocessed items by waiting for waittime and then recursively run the function again
      //   const unmarshalled = await AWS.DynamoDB.Converter.unmarshall(result.UnprocessedItems);
      //   setTimeout((this.batchPutIntoDynamoDb(unmarshalled, tableName), waitTime += 1000));
      // }
      return true;
    } catch (err) {
      console.error(err);
    }
    return true;
  }
}

module.exports = DynamoSvc;


// batchPutIntoDynamoDb(data, tableName, waitTime = 1000) {

// 	try {

// 		// Batch write takes up to 25 put item requests at one go => requests have to be batched and fired off in parallel
// 		batchArray = [];
// 		this.batchArray.push(this.data.splice(0, batchWriteRecordsLimit))

// 		// Put requests need to go in a particular format, each put request has to be modified into that format

// 		// Requests need to be marshalled and un-marshalled
// 		marshalled = AWS.DynamoDB.Converter.marshall(data)

// 		// Once marshalled put request fails or is unable to insert due to speed, it has to wait for a certain amount of time for which it has to sleep
// 		// Put requests have to be inserted in parallel
// 		//  Needs to handle unprocessed items
// 		//  handle for individual batch item size 400 kb

// 		setTimeout(() => { }, waitTime)
// 	}
// 	catch() { }
// }
