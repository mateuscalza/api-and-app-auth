# Servidor seguro

- Bindings para SQL seguro
- JWT
- Bcrypt para armazenar senhas

## Endpoints

### Autenticação

`POST /api/v1/users/auth`

```json
{
  "email": "fulano@mail.com",
  "password": "1234"
}
```

### Cadastrar publicação

`POST /api/v1/posts`

```json
{
  "title": "Lorem ipsum dolor sit amet",
  "body": "Maecenas dignissim quam quis elit luctus, sit amet aliquam libero posuere. Praesent sed lacus et tortor lacinia egestas non a felis. Nam sit amet erat nec quam rhoncus viverra. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus tempus mollis nibh, euismod dignissim justo pharetra sed. Vestibulum non viverra est, non tristique neque. Sed egestas, libero non vestibulum consequat, urna nisi lacinia felis, at tristique sapien magna id neque. Praesent pellentesque semper condimentum. In hendrerit fringilla justo. Vivamus ut molestie neque. Praesent vel eros quis urna feugiat mattis et a velit. Nam suscipit ornare facilisis. Etiam non elit ullamcorper nunc interdum dignissim ac a diam. Pellentesque a lectus sit amet mi fringilla congue. Curabitur vestibulum felis ac urna pretium, eget suscipit risus dictum."
}
```

### Listar publicações

`GET /api/v1/posts`

### Excluir publicação

`DELETE /api/v1/posts/:id`
