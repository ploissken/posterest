import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import Router from 'components/Router'
import { Grid } from 'semantic-ui-react'
import MinimalMenu from 'components/commons/MinimalMenu'
import HeaderMenu from 'components/commons/HeaderMenu'

class ResponsiveGrid extends Component {


  render() {
    const layout = []
    if(this.props.settings.minimal) {
      layout.push(
        <Grid.Row className="computer tablet only">
          <Grid.Column width={3}>
            <MinimalMenu />
          </Grid.Column>
          <Grid.Column width={13}>
            <Router />
          </Grid.Column>
        </Grid.Row>
      )
      layout.push(
        <Grid.Row className="mobile only">
          <HeaderMenu />
        </Grid.Row>
      )
      layout.push(
        <Grid.Row className="mobile only">
          <Router />
        </Grid.Row>
      )
    // top-header ugly layout
    } else {
      layout.push(
        <Grid.Row>
          <HeaderMenu />
        </Grid.Row>
      )
      layout.push(
        <Grid.Row>
          <Router />
        </Grid.Row>
      )
    }

    return (
      <Grid>
        <BrowserRouter>
          { layout }
        </BrowserRouter>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    settings: state.settings
  }
}

export default connect(mapStateToProps)(ResponsiveGrid)
