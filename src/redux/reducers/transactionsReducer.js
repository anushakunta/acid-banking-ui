const initial = { items: [], loading: false, error: null }
export default function transactions(state = initial, action) {
  switch (action.type) {
    case 'TX_FETCH_START': return { ...state, loading: true, error: null }
    case 'TX_FETCH_SUCCESS': return { ...state, loading: false, items: action.payload }
    case 'TX_FETCH_ERROR': return { ...state, loading: false, error: action.error }
    default: return state
  }
}
