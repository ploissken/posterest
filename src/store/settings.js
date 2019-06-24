const initialSettings = {
  darkmode: true,
  listview: true
}

const settingsReducer = (state = initialSettings, action) => {
  switch(action.type) {
    case 'CHANGE_DARK_MODE':
      console.log('settings change_dark_theme')
      return {
        ...state,
        darkmode: !state.darkmode
      }
    case 'CHANGE_VIEW_MODE':
      console.log('settings change_view')
      return {
        ...state,
        listview: !state.listview
      }
    default:
      console.log('settings default')
      return state;
  }
}
export default settingsReducer;
