import { gql } from '@apollo/client'
import client from '../../api/graphql-client'

const SIGNUP = gql`mutation($email:String!, $password:String!){ signUp(email:$email,password:$password){ token user{ id email role } errors } }`
const LOGIN = gql`mutation($email:String!, $password:String!){ login(email:$email,password:$password){ token user{ id email role } errors } }`

export const signup = (email, password) => async (dispatch) => {
  dispatch({ type: 'AUTH_START' })
  try {
    const { data } = await client.mutate({ mutation: SIGNUP, variables: { email, password } })
    const res = data.signUp
    if (res.errors && res.errors.length) throw new Error(res.errors.join(', '))
    localStorage.setItem('token', res.token)
    dispatch({ type: 'AUTH_SUCCESS', token: res.token, user: res.user })
  } catch (e) {
    dispatch({ type: 'AUTH_ERROR', error: e.message })
  }
}

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: 'AUTH_START' })
  try {
    const { data } = await client.mutate({ mutation: LOGIN, variables: { email, password } })
    const res = data.login
    if (res.errors && res.errors.length) throw new Error(res.errors.join(', '))
    localStorage.setItem('token', res.token)
    dispatch({ type: 'AUTH_SUCCESS', token: res.token, user: res.user })
  } catch (e) {
    dispatch({ type: 'AUTH_ERROR', error: e.message })
  }
}
