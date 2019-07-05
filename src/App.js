import React, { Component } from 'react'
import Router from './components/Router'
import { Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Noty from 'notifier'

class App extends Component {
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
    settings: state.settings
  }
}

export default connect(mapStateToProps)(App)
