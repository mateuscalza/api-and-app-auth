const pool = require('../../utils/database')

module.exports = async (request, response) => {
  let client
  try {
    client = await pool.connect()
    const result = await client.query(
      'SELECT id, title, body, created_at FROM "post" ORDER BY created_at DESC',
      []
    )
    const posts = result.rows.map(post => ({
      id: post.id,
      title: post.title,
      body: post.body,
      createdAt: post.created_at,
    }))

    response.send({
      posts,
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
