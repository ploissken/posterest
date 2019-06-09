import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import NewsGrid from './NewsGrid'
import InstaGrid from './InstaGrid'
import HeaderMenu from './HeaderMenu'

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <HeaderMenu />
        <Route path="/" component={null} />
        <Route path="/instagram" component={InstaGrid} />
        <Route path="/news" component={NewsGrid} />
        <Route path="/favorites" component={null} />
      </BrowserRouter>
    )
  }
}
