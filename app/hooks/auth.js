import usePersistentState from './persistentState'

export default function useAuth() {
  return usePersistentState('auth', { token: null, user: null })
}
