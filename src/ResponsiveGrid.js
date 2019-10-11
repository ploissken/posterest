import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import Router from 'components/Router'
import { Grid } from 'semantic-ui-react'
import MinimalMenu from 'components/commons/MinimalMenu'
import HeaderMenu from 'components/commons/HeaderMenu'

class ResponsiveGrid extends Component {


  render() {
    const layout = []
    if(this.props.settings.minimal) {
      layout.push(
        <Grid>
          <Grid.Row className="mobile only" key="minimal-mobile-header">
            <HeaderMenu />
          </Grid.Row>
          <Grid.Row key="minimal-grid">

            <Grid.Column className="computer tablet only" computer={3} tablet={3}>
              <MinimalMenu />
            </Grid.Column>

            <Grid.Column className="mobile only" width={1}/>

            <Grid.Column mobile={16} tablet={13} computer={13}>
              <Router />
            </Grid.Column>

            <Grid.Column className="mobile only" width={1}/>

          </Grid.Row>
        </Grid>
      )
      // layout.push(
      //   <Grid.Row className="mobile only" key="minimal-mobile-header">
      //     <HeaderMenu />
      //   </Grid.Row>
      // )
      // layout.push(
      //   <Grid.Row className="mobile only" key="minimal-mobile-grid">
      //     <Router />
      //   </Grid.Row>
      // )
    // top-header ugly layout
    } else {
      layout.push(
        <Grid>
          <Grid.Row key="ugly-header">
            <HeaderMenu />
          </Grid.Row>
          <Grid.Row key="ugly-grid">
            <Router />
          </Grid.Row>
        </Grid>
      )
    }

    return (
      <BrowserRouter>
        { layout }
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    settings: state.settings
  }
}

export default connect(mapStateToProps)(ResponsiveGrid)
