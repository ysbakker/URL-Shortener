const isEmpty = require('../util/isEmpty')
const AWS = require('aws-sdk')
const dynamo = new AWS.DynamoDB()

const getSlugData = async slug => {
  const result = await dynamo
    .getItem({ TableName: 'Slugs', Key: { slug: { S: slug } } })
    .promise()

  return isEmpty(result) ? null : result
}

module.exports = { getSlugData }
