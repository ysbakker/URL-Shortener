import AWS from 'aws-sdk'

const dynamo = new AWS.DynamoDB.DocumentClient()
import debug from 'debug'
import { isEmpty, stripUrl, generateSlug } from '../util/index'
const log = debug('log')

const getSlugData = async (slug: string): Promise<any> => {
  const result = await dynamo
    .get({
      TableName: 'Slugs',
      Key: { slug },
    })
    .promise()

  return isEmpty(result) ? null : result.Item
}

const getSlugByURL = async (url: string): Promise<any> => {
  const result = await dynamo
    .query({
      TableName: 'Slugs',
      IndexName: 'url-index',
      KeyConditionExpression: '#U = :url',
      ExpressionAttributeNames: { '#U': 'url' },
      ExpressionAttributeValues: {
        ':url': stripUrl(url).url,
      },
    })
    .promise()

  return result.Items?.[0]
}

const createSlug = async (inputUrl: string): Promise<any> => {
  const slug = generateSlug(5)
  const { url, https } = stripUrl(inputUrl)

  await dynamo
    .put({
      TableName: 'Slugs',
      Item: { slug, url, https: https ? undefined : false },
      ConditionExpression: 'attribute_not_exists(slug)',
    })
    .promise()

  return { slug, url, https: https ? undefined : false }
}

export { getSlugData, getSlugByURL, createSlug }
