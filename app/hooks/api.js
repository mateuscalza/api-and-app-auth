import axios from 'axios'
import { useMemo } from 'react'
import useAuth from './auth'

export default function useApi() {
  const [{ token }] = useAuth()

  return useMemo(() => axios.create({
    baseURL: 'http://localhost:3000/api/v1/',
    timeout: 5000,
    headers: token ? { 'Authorization': `Bearer ${token}` } : {}
  }), [token])
}
