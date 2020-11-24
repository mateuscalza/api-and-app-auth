module.exports = (...allowedPermissions) => (request, response, next) => {
  if (allowedPermissions.includes(request.user.permission)) {
    next()
  } else {
    response.status(403).send({ message: 'Sem a autorização necessária' })
  }
}
