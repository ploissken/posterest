import React, { Component } from 'react'
import { connect } from 'react-redux'

import { BrowserRouter, Route } from 'react-router-dom'
import NewsGrid from 'components/news/NewsGrid'
import SigninGrid from 'components/signin/SigninGrid'
import SignupGrid from 'components/signin/SignupGrid'
import InstaGrid from 'components/instagram/InstaGrid'
import ProfileGrid from 'components/profile/ProfileGrid'
import SettingsGrid from 'components/commons/SettingsGrid'
import FavsGrid from 'components/commons/FavsGrid'
import MinimalGrid from 'components/commons/MinimalGrid'

class Router extends Component {

  render() {
    return (
        <div>
          <Route path="/" component={null} />
          <Route path="/instagram" component={InstaGrid} />
          <Route path="/news" component={NewsGrid} />
          <Route path="/favorites" component={FavsGrid} />
          <Route path="/profile" component={ProfileGrid} />
          <Route path="/login" component={SigninGrid} />
          <Route path="/signup" component={SignupGrid} />
          <Route path="/settings" component={SettingsGrid} />
          <Route path="/minimal" component={MinimalGrid} />
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    settings: state.settings
  }
}

export default connect(mapStateToProps)(Router)
