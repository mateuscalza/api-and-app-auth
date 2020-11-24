import { useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
import { createNanoEvents } from 'nanoevents'

export const emitter = createNanoEvents()

export async function getCurrentState(key) {
  try {
    const raw = await SecureStore.getItemAsync(key)
    return raw ? JSON.parse(raw) : null
  } catch (error) {
    console.warn(error)
    return null
  }
}

export default function usePersistentState(
  key,
  initialValue,
) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    getCurrentState(key).then(existent => setValue(existent ?? initialValue))

    const unsubscribe = emitter.on(key, setValue)
    return unsubscribe
  }, [key])

  const setNewValue = async (newValue) => {
    return new Promise(resolve => {
      setValue(oldValue => {
        const finalValue = newValue instanceof Function ? newValue(oldValue) : newValue
        emitter.emit(key, finalValue)
        SecureStore.setItemAsync(key, JSON.stringify(finalValue))
          .catch(error => console.error(error))
          .then(() => resolve(finalValue))
        return finalValue
      })
    })
  }

  return [value, setNewValue]
}
