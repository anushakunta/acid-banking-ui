import { gql } from '@apollo/client'
import client from '../../api/graphql-client'

const TX_QUERY = gql`query($accountId:ID){ transactions(accountId:$accountId){ id amount transactionType description accountId createdAt } }`
const TX_CREATE = gql`mutation($accountId:ID!, $amount:Float!, $transactionType:String!, $description:String){
  createTransaction(accountId:$accountId, amount:$amount, transactionType:$transactionType, description:$description) {
    transaction { id amount transactionType description account { id balance } }
    errors
  }
}`

export const fetchTransactions = (accountId) => async (dispatch) => {
  dispatch({ type: 'TX_FETCH_START' })
  try {
    const { data } = await client.query({ query: TX_QUERY, variables: { accountId }, fetchPolicy: 'network-only' })
    dispatch({ type: 'TX_FETCH_SUCCESS', payload: data.transactions })
  } catch (e) {
    dispatch({ type: 'TX_FETCH_ERROR', error: e.message })
  }
}

export const createTransaction = (input) => async (dispatch) => {
  dispatch({ type: 'TX_FETCH_START' })
  try {
    await client.mutate({ mutation: TX_CREATE, variables: input })
    dispatch({ type: 'TX_FETCH_SUCCESS', payload: [] }) // caller should refetch list
  } catch (e) {
    dispatch({ type: 'TX_FETCH_ERROR', error: e.message })
  }
}
