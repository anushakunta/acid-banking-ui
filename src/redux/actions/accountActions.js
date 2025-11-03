import { gql } from '@apollo/client'
import client from '../../api/graphql-client'

const ACCOUNTS = gql`query { accounts { id name balance } }`

export const fetchAccounts = () => async (dispatch) => {
  dispatch({ type: 'ACCOUNTS_FETCH_START' })
  try {
    const { data } = await client.query({ query: ACCOUNTS, fetchPolicy: 'network-only' })
    dispatch({ type: 'ACCOUNTS_FETCH_SUCCESS', payload: data.accounts })
  } catch (e) {
    dispatch({ type: 'ACCOUNTS_FETCH_ERROR', error: e.message })
  }
}
