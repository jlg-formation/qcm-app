import CryptoJS from 'crypto-js'

const SECRET_KEY: string = 'salt' + import.meta.env.VITE_SECRET_KEY + 'salt'
console.log('SECRET_KEY: ', SECRET_KEY)

const encryptAPIKey = (key: string): string => {
  return CryptoJS.AES.encrypt(key, SECRET_KEY).toString()
}

const decryptAPIKey = (encryptedKey: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedKey, SECRET_KEY)
    return bytes.toString(CryptoJS.enc.Utf8)
  } catch {
    return ''
  }
}

export const getDecryptedKey = () => {
  const storedKey = localStorage.getItem('openai_api_key')
  let decryptedKey = ''

  try {
    decryptedKey = storedKey ? decryptAPIKey(storedKey) : ''
  } catch (error) {
    console.error('Erreur lors du déchiffrement de la clé API :', error)
  }
  return decryptedKey
}

export const setEncryptedKey = (key: string) => {
  const encryptedKey = encryptAPIKey(key)
  localStorage.setItem('openai_api_key', encryptedKey)
}
