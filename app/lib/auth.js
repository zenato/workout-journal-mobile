import { AsyncStorage } from 'react-native'

const ACCESS_TOKEN_KEY = '@accessToken'

export const getAccessToken = () => AsyncStorage.getItem(ACCESS_TOKEN_KEY)

export const setAccessToken = accessToken => AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken)

export const clearAccessToken = () => AsyncStorage.removeItem(ACCESS_TOKEN_KEY)
