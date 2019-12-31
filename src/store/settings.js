const initialSettings = {
  darkmode: true,
  listview: false,
  minimal: true
}

const settingsReducer = (state = initialSettings, action) => {
  switch(action.type) {
    case 'SET_SETTINGS':
      // console.log('************************** settings set')
      return {
        ...state,
        darkmode: action.prefs.darkmode,
        listview: action.prefs.listview,
        minimal: action.prefs.minimal
      }
    case 'CHANGE_DARK_MODE':
      // console.log('settings change_dark_theme')
      return {
        ...state,
        darkmode: !state.darkmode
      }
    case 'CHANGE_VIEW_MODE':
      // console.log('settings change_view')
      return {
        ...state,
        listview: !state.listview
      }
    case 'CHANGE_MINIMAL_MODE':
      // console.log('settings change_theme')
      return {
        ...state,
        minimal: !state.minimal
      }
    case 'USER_LOGOUT':
      // console.log('settings user_logout')
      return {
        ...initialSettings
      }
    default:
      // console.log('settings default')
      return state;
  }
}
export default settingsReducer;
