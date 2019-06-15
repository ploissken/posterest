const initialSettings = {
  user: undefined
}

const loginReducer = (state = initialSettings, action) => {
  switch(action.type) {
    case 'USER_LOGIN':
      return {
        ...state,
        user: action.user
      }
    case 'USER_LOGOUT':
      return {
        ...state,
        user: undefined
      }
    default:
      return state;
  }
}
export default loginReducer
