import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import NewsGrid from 'components/news/NewsGrid'
import SigninGrid from 'components/signin/SigninGrid'
import SignupGrid from 'components/signin/SignupGrid'
import InstaGrid from 'components/instagram/InstaGrid'
import ProfileGrid from 'components/profile/ProfileGrid'
import SettingsGrid from 'components/commons/SettingsGrid'
import FavsGrid from 'components/commons/FavsGrid'
import HeaderMenu from 'components/commons/HeaderMenu'

export default class Router extends Component {
  render() {
    return (
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
      </BrowserRouter>
    )
  }
}
