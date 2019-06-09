
const postReducer = (state = [], action) => {
  console.log('so far so good')
  switch(action.type) {
    case 'ADD_POST':
      console.log('so far so GREAT')
      return state.concat('olar');
    default:
      console.log('default')
      return state;
  }
}
export default postReducer;
