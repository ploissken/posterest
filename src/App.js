import React, { Component } from 'react'
import Router from './components/Router'
import { Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Noty from 'notifier'
import api from 'api'

class App extends Component {
  componentDidMount() {
    if(!this.props.login.user || !this.props.login.count) {
      api('/profile').get().then(data => {
        console.log('componentDidMount @ SignInGrid')
        console.log(data)
        this.props.dispatch({
          type:'SET_COUNT',
          count: data.count
        })
        this.props.dispatch({
          type:'USER_LOGIN',
          user: data.user
        })
        this.props.dispatch({
          type:'SET_FAVORITE',
          fav: data.favorites
        })
      }).catch(oops => {
        console.log('oops', oops)
      })
    }
  }

  render() {
    return (
      <Segment basic inverted={this.props.settings.darkmode}>
        <Noty />
        <Router />
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('hi, my name is state', state)
  return {
    login: state.login,
    settings: state.settings
  }
}

export default connect(mapStateToProps)(App)
