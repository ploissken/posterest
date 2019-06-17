import React from 'react';
import api from 'api'

class FavsGrid extends React.Component {

  componentDidMount() {
    // let _self = this
    api('/profile').get().then((data) => {
      console.log('/profile data', data)
      // FIXME
      // _self.props.dispatch({
      //   type:'USER_LOGIN',
      //   user: data.user
      // })
      // _self.props.dispatch({
      //   type:'SET_FAVORITE',
      //   fav: data.favorites
      // })
    })
  }

  render() {
    console.log('rendering favs')
    return (<h1> olar </h1>)
  }
}


export default FavsGrid
