const favReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_FAVORITE':
    console.log('add fav')
      return [ ...state, action.fav ]
    case 'REM_FAVORITE':
    console.log('rem fav')
      return [ ...state ].filter( e => e.nid !== action.fav.nid )
    case 'SET_FAVORITE':
    console.log('set fav')
      return action.fav
    case 'USER_LOGOUT':
    console.log('set fav')
      return []
    default:
      return state;
  }
}
export default favReducer
