import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const preloaded = {
  auth: {
    token: localStorage.getItem('token'),
    user: null,
    loading: false,
    error: null
  }
}
const store = createStore(rootReducer, preloaded, composeEnhancers(applyMiddleware(thunk)))
export default store
