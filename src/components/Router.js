import React, { Component } from 'react'
import { connect } from 'react-redux'

import { BrowserRouter, Route } from 'react-router-dom'
import { Segment, Grid } from 'semantic-ui-react'
import NewsGrid from 'components/news/NewsGrid'
import SigninGrid from 'components/signin/SigninGrid'
import SignupGrid from 'components/signin/SignupGrid'
import InstaGrid from 'components/instagram/InstaGrid'
import ProfileGrid from 'components/profile/ProfileGrid'
import SettingsGrid from 'components/commons/SettingsGrid'
import FavsGrid from 'components/commons/FavsGrid'
import MinimalGrid from 'components/commons/MinimalGrid'
import MinimalMenu from 'components/commons/MinimalMenu'
import HeaderMenu from 'components/commons/HeaderMenu'

class Router extends Component {


  render() {
    const miniRouter = (
    <BrowserRouter>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <MinimalMenu />
          </Grid.Column>
          <Grid.Column width={13}>
            <Route path="/" component={null} />
            <Route path="/instagram" component={InstaGrid} />
            <Route path="/news" component={NewsGrid} />
            <Route path="/favorites" component={FavsGrid} />
            <Route path="/profile" component={ProfileGrid} />
            <Route path="/login" component={SigninGrid} />
            <Route path="/signup" component={SignupGrid} />
            <Route path="/settings" component={SettingsGrid} />
            <Route path="/minimal" component={MinimalGrid} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </BrowserRouter>)

    const mainRouter = (
    <BrowserRouter>
      <HeaderMenu />
      <Route path="/" component={null} />
      <Route path="/instagram" component={InstaGrid} />
      <Route path="/news" component={NewsGrid} />
      <Route path="/favorites" component={FavsGrid} />
      <Route path="/profile" component={ProfileGrid} />
      <Route path="/login" component={SigninGrid} />
      <Route path="/signup" component={SignupGrid} />
      <Route path="/settings" component={SettingsGrid} />
      <Route path="/minimal" component={MinimalGrid} />
    </BrowserRouter>)


    if(this.props.settings.minimal) {
      return miniRouter
    } else {
      return mainRouter
    }

  }
}

const mapStateToProps = (state) => {
  return {
    settings: state.settings
  }
}

export default connect(mapStateToProps)(Router)
