const initial = { token: null, user: null, loading: false, error: null }

export default function auth(state = initial, action) {
  switch (action.type) {
    case 'AUTH_START': return { ...state, loading: true, error: null }
    case 'AUTH_SUCCESS': return { ...state, loading: false, token: action.token, user: action.user }
    case 'AUTH_ERROR': return { ...state, loading: false, error: action.error }
    case 'AUTH_LOGOUT': return { token: null, user: null, loading: false, error: null }
    default: return state
  }
}
