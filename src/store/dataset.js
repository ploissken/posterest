
const postReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_POST':
      console.log('dataset add_post')
      return state.concat('olar');
    default:
      console.log('dataset default')
      return state;
  }
}
export default postReducer;
