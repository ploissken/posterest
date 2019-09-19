import React, { Component } from 'react'
import { Menu, Icon, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import api from 'api'

// const options = [
//   { value: 'favorites', text: 'Favorites', icon: 'star'},
//   { value: 'settings', text: 'Settings', icon: 'settings'},
//   { value: 'sign-out', text: 'Sign Out', icon: 'sign out'}
// ]

const trigger = (
    <Icon name="user circle"/>
)

class HeaderMenu extends Component {
  dispatchLogout = (() => {
    api('/logout').get().then((data) => {
      console.log('UIA')
      console.log(data)
      this.props.dispatch({
        type:'USER_LOGOUT'
      })
    }).catch(oops => {
      console.log('catcherrr', oops)
    })
  })

  loginButton = (userLogged => {
    console.log('loginbutt', userLogged)
    if(userLogged) {
      return (
        <Dropdown
          trigger={trigger}
          onChange={this.handleChange}
          floating
          icon={null} >
          <Dropdown.Menu className={this.props.settings.darkmode ? 'inverted' : ''}>
            <Dropdown.Header icon='user' content={this.props.login.user.social_name || this.props.login.user.username} />
            <Dropdown.Divider />
            <div className="item">
              <Link to="/favorites"> <Icon name='star' /> Favorites </Link>
            </div>
            <div className="item">
              <Link to="/settings"> <Icon name='cog' /> Settings </Link>
            </div>
            <button className="item" onClick={this.dispatchLogout}>
              <Icon name='sign out' /> Sign-out
            </button>
          </Dropdown.Menu>
        </Dropdown>
      )
    } else {
      return <Link to="/login"> <Icon name='user' /> Login </Link>
    }
  })

  handleChange = (e, { value }) => {
    if (value) {

    }
    console.log('handling change', value)
  }

  render() {
    return (
      <Menu borderless fluid fixed="top"
        inverted={this.props.settings.darkmode}
        color={this.props.settings.darkmode ? 'grey' : 'black'}>
        <Menu.Item> posterest </Menu.Item>
        <Menu.Menu position='right'>

          <div className="item">
            <Link to="/instagram"> <Icon name='instagram' /> Instagram </Link>
          </div>

          <div className="item">
            <Link to="/news"> <Icon name='bullhorn' /> News </Link>
          </div>

          <div className="item">
            {this.loginButton(this.props.login.user)}
          </div>

        </Menu.Menu>
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    settings: state.settings,
    login: state.login
  }
}

export default connect(mapStateToProps)(HeaderMenu)
