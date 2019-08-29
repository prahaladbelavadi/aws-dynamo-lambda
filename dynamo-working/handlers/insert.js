const dynamoSvc = require('../modules/shared/dynamo');

const handler = async (event) => {
  try {
    const recordData = {
      title: 'Prahlad1',
      director: 'Hiranyakashyap1',
    };

    const result = await dynamoSvc.batchPutIntoDynamoDb([recordData], 'Movies');

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: JSON.stringify(result, null, 2),
          input: event,
        },
        null, 2,
      ),
    };
  } catch (ex) {
    console.log(ex.toString());
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          error: ex instanceof Error ? ex.toString() : typeof ex === 'object' ? JSON.stringify(ex, null, 2) : ex,
          input: event,
        },
        null, 2,
      ),
    };
  }
};

module.exports.handler = handler;
