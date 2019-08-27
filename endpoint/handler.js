const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

module.exports.createUser = async (event) => {
  try {
    const params = {
      TableName: 'CUSTOMER_LIST',
      Item: {
        CUSTOMER_ID: { N: '022' },
        CUSTOMER_NAME: { S: 'R3232e' },
      },
    };

    await ddb.putItem(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'User entered!',
          input: event,
        },
        null,
        2,
      ),
    };
  } catch (e) {
    console.log(e.toString());
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          error: e.toString(),
          input: event,
        },
        null,
        2,
      ),
    };
  }
};
