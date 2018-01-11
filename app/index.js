import React from 'react'
import { Provider } from 'react-redux'
import { Sentry } from 'react-native-sentry'
import configureStore from './state/configureStore'
import { SENTRY_DSN } from './config'
import App from './App'

if (process.env.NODE_ENV === 'production') { // eslint-disable-line no-undef
  Sentry.config(SENTRY_DSN).install()
}

const store = configureStore()

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)
