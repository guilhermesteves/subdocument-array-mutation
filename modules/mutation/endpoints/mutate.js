const { mutate } = require('../../../shared/mutation')
const { ok, unprocessableEntity, serverError } = require('../../../shared/api')

function getBody(event) {
  try {
    if (!event || !event.body) {
      return {}
    }

    const body = JSON.parse(event.body)
    console.info(`BODY ${JSON.stringify(body, null, 2)}`)

    return body
  } catch (error) {
    return {}
  }
}

/**
 * Mutate one or more operations
 * @param  {[type]}   event    [Event Trigger]
 * @param  {[type]}   context  [Event Context]
 * @return {[type]}            [200 or 422]
 *
 */
module.exports.handler = async (event) => {
  console.info(`START ${JSON.stringify(event, null, 2)}`)

  try {
    const { user, mutation } = getBody(event)

    if (!user || !user.posts || !mutation) {
      return unprocessableEntity()
    }

    const { _id: id } = user
    console.info(`Generating mutations for User: ${id}`)

    return ok({ payload: mutate({ data: user, mutation }) })
  } catch (err) {
    console.error(err)
    return serverError()
  }
}
