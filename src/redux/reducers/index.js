import { combineReducers } from 'redux'
import accounts from './accountsReducer'
import transactions from './transactionsReducer'
import auth from './authReducer'

export default combineReducers({ accounts, transactions, auth })
