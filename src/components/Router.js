import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import NewsGrid from './news/NewsGrid'
import SigninGrid from './signin/SigninGrid'
import SignupGrid from './signin/SignupGrid'
import InstaGrid from './instagram/InstaGrid'
import FavsGrid from './Favorites'
import HeaderMenu from './HeaderMenu'

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <HeaderMenu />
        <Route path="/" component={null} />
        <Route path="/instagram" component={InstaGrid} />
        <Route path="/news" component={NewsGrid} />
        <Route path="/favorites" component={FavsGrid} />
        <Route path="/login" component={SigninGrid} />
        <Route path="/signup" component={SignupGrid} />
      </BrowserRouter>
    )
  }
}
