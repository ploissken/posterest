const initialSettings = {
  ids: [],
  fetched: undefined
}

const favReducer = (state = initialSettings, action) => {
  switch(action.type) {
    case 'ADD_FAVORITE':
    // console.log('add fav')
      return {
        ...state,
        ids: [ ...state.ids, action.fav ]
      }
    case 'REM_FAVORITE':
    // console.log('rem fav')
      // return [ ...state ].filter( e => e.nid !== action.fav.nid )
      return {
        ...state,
        ids: [ ...state.ids ].filter( e => e.nid !== action.fav.nid )
      }
    case 'SET_FAVORITE':
    // console.log('set fav')
      // return action.fav
      return {
        ...state,
        ids: [...action.fav]
      }
    case 'SET_FETCHED_FAVS':
      return {
        ...state,
        fetched: action.fetched
      }
    case 'USER_LOGOUT':
    // console.log('fav user_logout')
      return initialSettings
    default:
      // console.log('fav default')
      return state;
  }
}
export default favReducer
