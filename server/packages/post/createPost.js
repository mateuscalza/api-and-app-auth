const pool = require('../../utils/database')

module.exports = async (request, response) => {
  let client
  try {
    client = await pool.connect()

    const id = uuid()
    const post = {
      id,
      title: request.body.title,
      body: request.body.body,
      authorId: request.user.id,
      createdAt: new Date(),
    }

    await client.query(
      'INSERT INTO post (id, title, body, author_id, created_at) VALUES ($1, $2, $3, $4, $5)',
      [post.id, post.title, post.body, post.authorId, post.createdAt]
    )

    response.send({
      post,
    })
  } catch (error) {
    console.error(error)
    response.status(500).send({ message: error.message })
  } finally {
    if (client) {
      client.release()
    }
  }
}
