const pool = require('../../utils/database')

module.exports = async (request, response) => {
  let client
  try {
    client = await pool.connect()

    const id = request.params.id
    const result = await client.query(
      'DELETE FROM post WHERE id = $1',
      [id]
    )

    if (!result.rowCount) {
      response.status(404).send({ message: 'Post não encontrado' })
      return
    }

    response.send({
      message: "Excluído com sucesso",
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
