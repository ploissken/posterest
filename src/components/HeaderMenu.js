import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

class HeaderMenu extends Component {
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
    )
  }
}

const mapStateToProps = (state) => {
  return {
    settings: state.settings
  }
}

export default connect(mapStateToProps)(HeaderMenu);
