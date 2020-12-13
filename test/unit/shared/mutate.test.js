const { expect, assert } = require('chai')
const { describe, it } = require('mocha')
const { v4: uuid } = require('uuid')

const { mutate } = require('../../../shared/mutation')

describe('Mutate lib', () => {
  const user = {
    _id: uuid(),
    name: 'John Doe',
    posts: [
      {
        _id: 2,
        value: 'The Game',
        mentions: []
      },
      {
        _id: 6,
        value: 'Whats the best music?',
        mentions: [ { _id: 1, text: 'Darude Sandstorm' }, { _id: 7, text: 'Rock Lee vs Gaara - Linkin park' } ] },
      {
        _id: 14,
        value: 'Batman > Superman',
        mentions: []
      }
    ]
  }

  describe('Should handle single post', () => {
    it('add statement', async () => {
      const mutation = { posts: [{ value: 'Cyclops was right' }] }
      const expected = { $add: { posts: [{ value: 'Cyclops was right' }] } }

      const result = mutate({ data: user, mutation })
      assert.deepEqual(result, expected)
    })

    it('update statement', async () => {
      const mutation = { posts: [{ _id: 2, value: 'Xavier’s dream is alive' }] }
      const expected = { $update: { 'posts.0.value': 'Xavier’s dream is alive' } }

      const result = mutate({ data: user, mutation })
      assert.deepEqual(result, expected)
    })

    it('delete statement', async () => {
      const mutation = { posts: [{ _id: 14, _delete: true }] }
      const expected = { $remove: { 'posts.2': true } }

      const result = mutate({ data: user, mutation })
      assert.deepEqual(result, expected)
    })
  })

  describe('Should handle single mention', () => {
    it('add statement', async () => {
      const mutation = { posts: [{ _id: 6, mentions: [{ text: 'Baby Shark Dance' }] }] }
      const expected = { $add: { 'posts.1.mentions': [{ text: 'Baby Shark Dance' }] } }

      const result = mutate({ data: user, mutation })
      assert.deepEqual(result, expected)
    })

    it('update statement', async () => {
      const mutation = { posts: [{ _id: 6, mentions: [{ _id: 1, text: 'lofi hip hop radio - beats to relax/study to' }] }] }
      const expected = { $update: { 'posts.1.mentions.0.text': 'lofi hip hop radio - beats to relax/study to' } }

      const result = mutate({ data: user, mutation })
      assert.deepEqual(result, expected)
    })

    it('delete statement', async () => {
      const mutation = { posts: [{ _id: 6, mentions: [{ _id: 7, _delete: true }] }] }
      const expected = { $remove: { 'posts.1.mentions.1': true } }

      const result = mutate({ data: user, mutation })
      assert.deepEqual(result, expected)
    })
  })

  it('Should handle multiple statements at the request', () => {
    const mutation = { posts: [{ _id: 2, value: 'Oh noes' }, { value: 'You know nothing, Jon Snow' }, { _id: 14, _delete: true }] }
    const expected = { $update: { 'posts.0.value': 'Oh noes' }, $add: { posts: [{ value: 'You know nothing, Jon Snow' }] }, $remove: { 'posts.2': true } }

    const result = mutate({ data: user, mutation })
    assert.deepEqual(result, expected)
  })
})
