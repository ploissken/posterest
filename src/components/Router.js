import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import NewsGrid from './NewsGrid'
import InstaGrid from './InstaGrid'
import {connect} from 'react-redux'

class Router extends Component {
  darkModeUpdate = (e => {
    e.preventDefault();
    this.props.dispatch({
      type:'CHANGE_DARK_MODE'
    })
  })

  viewModeUpdate = (e => {
    e.preventDefault();
    this.props.dispatch({
      type:'CHANGE_VIEW_MODE'
    })
  })

  render() {
    return (
      <BrowserRouter>
        <Menu borderless fluid fixed="top"
          inverted={this.props.settings.darkmode}
          color={this.props.settings.darkmode ? 'grey' : 'black'}>
          <Menu.Item> posterest </Menu.Item>
          <Menu.Menu position='right'>

            <Menu.Item name='darkmode' onClick={this.darkModeUpdate}>
              <Icon name={this.props.settings.darkmode ? 'sun' : 'moon'}
                className={this.props.settings.darkmode ? 'yellow loading' : ''}
              />
            </Menu.Item>

            <Menu.Item name='viewmode' onClick={this.viewModeUpdate} >
              <Icon name={this.props.settings.listview ? 'th' : 'list'} />
            </Menu.Item>

            <div className="item">
              <Link to="/instagram"> <Icon name='instagram' /> Instagram </Link>
            </div>

            <div className="item">
              <Link to="/news"> <Icon name='bullhorn' /> News </Link>
            </div>

            <div className="item">
              <Link to="/favorites"> <Icon name='star' /> Favorites </Link>
            </div>

            <div className="item">
              <Link to="/favorites"> <Icon name='user' /> Login </Link>
            </div>

          </Menu.Menu>
        </Menu>
        <Route path="/" component={null} />
        <Route path="/instagram" component={InstaGrid} />
        <Route path="/news" component={NewsGrid} />
        <Route path="/favorites" component={null} />
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('hi, i am state', state)
  return {
    settings: state.settings
  }
}

export default connect(mapStateToProps)(Router);
