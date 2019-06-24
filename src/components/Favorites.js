import React from 'react'
import {connect} from 'react-redux'
import api from 'api'

class FavsGrid extends React.Component {

  componentDidMount() {
    // if(this.props.login.user){
    //
    // }
    // let credentials = {
    //   body: JSON.stringify({
    //     user: this.props.login.user
    //   })
    // }
    api('/load-favs').get().then((data) => {
      console.log('UIA')
      console.log(data)
    }).catch(oops => {
      console.log('catcherrr', oops)
      // Noty().error(oops.message)
    })
  }

  render() {
    console.log('rendering favs')
    return (<h1> olar </h1>)
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps)(FavsGrid)
