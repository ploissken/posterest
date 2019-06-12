const initialSettings = {
  darkmode: true,
  listview: true
}

const settingsReducer = (state = initialSettings, action) => {
  switch(action.type) {
    case 'CHANGE_DARK_MODE':
      return {
        ...state,
        darkmode: !state.darkmode
      }
    case 'CHANGE_VIEW_MODE':
      return {
        ...state,
        listview: !state.listview
      }
    default:
      return state;
  }
}
export default settingsReducer;
