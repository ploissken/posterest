const initialSettings = {
  user: undefined,
  count: undefined
}

const loginReducer = (state = initialSettings, action) => {
  switch(action.type) {
    case 'USER_LOGIN':
      // console.log('user_login')
      return {
        ...state,
        user: action.user
      }
    case 'USER_LOGOUT':
      // console.log('user_logout')
      return {
        ...state,
        user: undefined
      }
    case 'SET_COUNT':
      // console.log('set_count')
      // console.log('olar count', action.count)
      return {
        ...state,
        count: action.count
      }
    default:
      // console.log('login_default')
      return state;
  }
}
export default loginReducer
