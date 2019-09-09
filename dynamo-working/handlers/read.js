const dyanmoSvc = require('../modules/shared/dynamo');

const handler = async (event) => {
  try {
    const result = dyanmoSvc.getItemFromDynamoDb('Movies', 'prahalad', 'title', 'Hiranyakashyap', 'director');

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: JSON.stringify(result, null, 2),
        input: event,
      }, null, 2),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
      input: event,
    };
  }
};

module.exports.handler = handler;
