import { Alert } from 'react-native'

export default function handleError(error) {
  let message
  if (error.response) {
    switch (error.response.status) {
      case 401:
        message = 'Erro de AUTENTICAÇÃO'
        break
      case 403:
        message = 'Erro de AUTORIZAÇÃO'
        break
      default:
        message = error.response.data?.message ?? error.message
    }
  } else {
    message = error.message
  }

  Alert.alert('Ocorreu um erro', message)
}

