const { expect, assert } = require('chai')
const { describe, it } = require('mocha')
const { v4: uuid } = require('uuid')

const body = b => b ? { body: JSON.stringify(b) } : {}
const { handler } = require('../../../../../modules/mutation/endpoints/mutate')

describe('Test API /mutate', () => {
  const user = {
    _id: uuid(),
    name: 'John Doe',
    posts: [
      {
        _id: 3,
        mentions: [ {_id: 5, text: 'Kakaroto'} ]
      }
    ]
  }

  const mutation = { posts: [{ value: 'Vegeta' }] }

  it('Should not accept a request without body', async () => {
    const result = await handler(body())
    expect(result.statusCode).to.be.equal(422)
    expect(result.body).to.be.empty
  })

  it('Should accept a request with proper body', async () => {
    const result = await handler(body({ user, mutation }))
    const expected = { $add: { posts:[ {value:'Vegeta'} ]} }

    expect(result.statusCode).to.be.equal(200)
    expect(result.body).not.to.be.empty
    assert.deepEqual(JSON.parse(result.body), expected)
  })
})
