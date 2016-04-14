var Promise  = require('bluebird'),
    AWS      = require('aws-sdk'),
    moment   = require('moment');


var opt = {}
if (process.env.DEBUG) {
  opt = {
    region:'us-west-2',
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
  }
} else {
  opt = {
    region:'us-west-2'
  }
}

var dynamodb = new AWS.DynamoDB(opt);
Promise.promisifyAll(Object.getPrototypeOf(dynamodb));

module.exports = {
  findOrCreate: findOrCreate,
  findById: findById,
  findAll: findAll
};

function findById(id) {
  return dynamodb.getItemAsync({
    TableName: process.env.USERS_TABLE,
    Key: {
      id: { S: id }
    }
  })
  .then(function (result) {
    if (result && 'Item' in result) {
      return cleanUser(result.Item);
    } else {
      return {};
    }
  });
}

function findAll() {
  return dynamodb.scanAsync({ TableName: process.env.USERS_TABLE })
  .then(function (results) {
    return {
      users: results.Items.map(cleanUser)
    };
  });
}

function findOrCreate(user) {
  return dynamodb.getItemAsync({
    TableName: process.env.USERS_TABLE,
    Key: {
      id: { S: user.idpId + "/" + user.sourceId }
    }
  })
  .then(function(result) {
    if (result && 'Item' in result) {
      // User exists, get their ID
      if (process.env.DEBUG) {
        console.log("found existing user ", result.Item);
      }
      return cleanUser(result.Item);
    } else {
      // No user, create a new one
      if (process.env.DEBUG) {
        console.log("No such user, creating: ", user);
      }
      return createUser(user);
    }
  });
}

function cleanUser(user) {
  return {
    id: user.id.S,
    sourceId: user.sourceId.S,
    email: user.email.S,
    name: user.name.S,
    imageURL: user.imageURL.S,
    idpId : user.idpId.S
  };
}
function createUser(user) {
  var id = user.idpId + "/" + user.sourceId
  return dynamodb.putItemAsync({
    TableName: process.env.USERS_TABLE,
    Item: {
      id:       { S: id },
      sourceId: { S: user.sourceId },
      email:    { S: user.email },
      name:     { S: user.name },
      imageURL: { S: user.imageURL},
      idpId:    { S: user.idpId },
      createdAt:  { S: moment().unix().toString() },
      updatedAt:  { S: moment().unix().toString() },
    },
    ConditionExpression: 'attribute_not_exists (id)'
  })
  .then(function () {
    return user; // Successful response, no data is returned, use new ID
  });
}
