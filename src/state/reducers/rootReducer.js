import initialState from '../store/initialState'

const rootReducer = (state = initialState, action) => {
  
  if (action.type === 'CHANGE_ARTICLE') {
    return {
      ...state,
      currentArticle: action.payload
    }
  } else {
    return state
  }
}

export default rootReducer