var AWS = require("aws-sdk");

AWS.config.update({
    region: 'us-east-1'
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Movies";

var year = 2015;
var title = "The Big New Movie";

var params = {
    TableName: table,
    Key: {
        "year": year,
        "title": title
    }
};

docClient.get(params, function (err, data) {
    if (err) {
        console.error("Unable to read Item. \n Error JSON: \n:", JSON.stringify(err, null), 2)
    } else {
        console.log("getItem success \n ", JSON.stringify(data, null, 2));

    }
})