import React, { Component } from 'react'
import Router from './components/Router'
import { Segment } from 'semantic-ui-react'
import { connect } from 'react-redux';
import Noty from 'notifier'

class App extends Component {
  render() {
    return (
      <Segment inverted={this.props.settings.darkmode}>
      <Noty />
        <Router />
        <h1>{console.log(this.props.posts)}</h1>
        <h1>{this.props.posts}</h1>
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('hi, my name is state', state)
  return {
    posts: state.reducers,
    settings: state.settings
  }
}

export default connect(mapStateToProps)(App);
