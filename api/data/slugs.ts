import debug from 'debug'
import { generateSlug } from '../util/index'
import { stripUrl } from '../../common/util'
import { Slug } from '../../common/types'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import createHttpError from 'http-errors'
const dynamo = new DocumentClient()
const log = debug('log')

const TABLE_NAME = `slugs-${process.env.STAGE == 'prod' ? 'prod' : 'dev'}`

export const getSlugData = async (slug: string): Promise<Slug> => {
  let result: DocumentClient.AttributeMap | undefined
  try {
    const { Item } = await dynamo
      .get({
        TableName: TABLE_NAME,
        Key: { slug },
      })
      .promise()
    result = Item
  } catch (e) {
    throw createHttpError(500, 'Data provider error occurred', {
      details: e,
    })
  }

  if (!result) throw createHttpError(404, 'Slug not found')
  return result as Slug
}

export const getSlugByUrl = async (url: string): Promise<Slug | undefined> => {
  let result: DocumentClient.ItemList | undefined
  try {
    const { Items } = await dynamo
      .query({
        TableName: TABLE_NAME,
        IndexName: 'url-index',
        KeyConditionExpression: '#U = :url',
        ExpressionAttributeNames: { '#U': 'url' },
        ExpressionAttributeValues: {
          ':url': stripUrl(url).url,
        },
      })
      .promise()
    result = Items
  } catch (e) {
    throw createHttpError(500, 'Data provider error occurred', {
      details: e,
    })
  }

  return result?.[0] as Slug
}

export const createSlug = async (inputUrl: string): Promise<Slug> => {
  const slug = generateSlug(5)
  const { url, https } = stripUrl(inputUrl)
  try {
    await dynamo
      .put({
        TableName: TABLE_NAME,
        Item: { slug, url, https },
        ConditionExpression: 'attribute_not_exists(slug)',
      })
      .promise()
  } catch (e) {
    throw createHttpError(500, 'Data provider error occurred', {
      details: e,
    })
  }

  return { slug, url, https }
}
