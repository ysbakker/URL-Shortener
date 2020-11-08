const AWS = require('aws-sdk')
const dynamo = new AWS.DynamoDB.DocumentClient()
const $ = require('../util/index')
const log = require('debug')('log')

const getSlugData = async slug => {
  const result = await dynamo
    .get({
      TableName: 'Slugs',
      Key: { slug },
    })
    .promise()

  return $.isEmpty(result) ? null : result.Item
}

const getSlugByURL = async url => {
  const result = await dynamo
    .query({
      TableName: 'Slugs',
      IndexName: 'url-index',
      KeyConditionExpression: '#U = :url',
      ExpressionAttributeNames: { '#U': 'url' },
      ExpressionAttributeValues: {
        ':url': $.stripUrl(url).url,
      },
    })
    .promise()

  return result.Items[0] || null
}

const createSlug = async inputUrl => {
  const slug = $.generateSlug(5)
  const { url, https } = $.stripUrl(inputUrl)

  await dynamo
    .put({
      TableName: 'Slugs',
      Item: { slug, url, https: https ? undefined : false },
      ConditionExpression: 'attribute_not_exists(slug)',
    })
    .promise()

  return { slug, url, https: https ? undefined : false }
}

module.exports = { getSlugData, getSlugByURL, createSlug }
