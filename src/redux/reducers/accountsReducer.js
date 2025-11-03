const initial = { items: [], loading: false, error: null }
export default function accounts(state = initial, action) {
  switch (action.type) {
    case 'ACCOUNTS_FETCH_START': return { ...state, loading: true, error: null }
    case 'ACCOUNTS_FETCH_SUCCESS': return { ...state, loading: false, items: action.payload }
    case 'ACCOUNTS_FETCH_ERROR': return { ...state, loading: false, error: action.error }
    default: return state
  }
}
