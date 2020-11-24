const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../../utils/database')

module.exports = async (request, response) => {
  let client
  try {
    client = await pool.connect()
    const result = await client.query(
      'SELECT id, name, email, permission, hash FROM "user" WHERE email = $1 LIMIT 1',
      [request.body.email]
    )
    const existingUser = result.rows[0]

    if (!existingUser || !await bcrypt.compare(request.body.password, existingUser.hash)) {
      response.status(401).send({ message: 'Verifique seu usuário e senha.' })
      return
    }

    const token = jwt.sign({
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      permission: existingUser.permission
    }, process.env.SECRET)

    response.send({
      token,
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
