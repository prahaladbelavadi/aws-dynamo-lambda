const AWS = require('aws-sdk');

const batchWriteRecordsLimit = 25;
const querySafeBatchLimit = 1000;

AWS.config.update({ region: 'us-east-1' });
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

class DynamoSvc {
	batchPutIntoDynamoDb(data, tableName, waitTime = 1000) {

		try {

			// Batch write takes up to 25 put item requests at one go => requests have to be batched and fired off in parallel
			batchArray = [];
			this.batchArray.push(this.data.splice(0, batchWriteRecordsLimit))

			// Put requests need to go in a particular format, each put request has to be modified into that format

			// Requests need to be marshalled and un-marshalled
			marshalled = AWS.DynamoDB.Converter.marshall(data)

			// Once marshalled put request fails or is unable to insert due to speed, it has to wait for a certain amount of time for which it has to sleep
			// Put requests have to be inserted in parallel
			//  Needs to handle unprocessed items
			//  handle for individual batch item size 400 kb

			setTimeout(() => { }, waitTime)
		}
		catch() { }
	}

}

module.exports = DynamoSvc;
