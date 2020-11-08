const AWS = require('aws-sdk')
const { unmarshall } = AWS.DynamoDB.Converter
const dynamo = new AWS.DynamoDB()
const isEmpty = require('../util/isEmpty')
const stripUrl = require('../util/stripUrl')
const log = require('debug')('log')

const getSlugData = async slug => {
  const result = await dynamo
    .getItem({
      TableName: 'Slugs',
      Key: { slug: { S: slug } },
    })
    .promise()

  return isEmpty(result) ? null : unmarshall(result.Item)
}

const getSlugByURL = async url => {
  const result = await dynamo
    .query({
      TableName: 'Slugs',
      IndexName: 'url-index',
      KeyConditionExpression: '#U = :url',
      ExpressionAttributeNames: { '#U': 'url' },
      ExpressionAttributeValues: {
        ':url': {
          S: stripUrl(url).url,
        },
      },
    })
    .promise()

  return unmarshall(result.Items[0]) || null
}

module.exports = { getSlugData, getSlugByURL }
