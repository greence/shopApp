import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './store'
import { Provider } from 'react-redux'
import { ApolloProvider, ApolloClient, InMemoryCache, } from '@apollo/client'
import App from './App'
import './index.scss'

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App client={client} />
    </ApolloProvider>
  </Provider>
  // </React.StrictMode>
)