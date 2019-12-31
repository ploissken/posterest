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
    <Icon name="bars"/>
)

class HeaderMenu extends Component {
  dispatchLogout = (() => {
    api('/logout').get().then((data) => {
      // console.log('UIA')
      // console.log(data)
      this.props.dispatch({
        type:'USER_LOGOUT'
      })
    }).catch(oops => {
      // console.log('catcherrr', oops)
    })
  })

  loginButton = (userLogged => {
    // console.log('loginbutt', userLogged)
    const news = (
      <div className="item">
        <Link to="/news"> <Icon name='bullhorn' /> News </Link>
      </div>
    )
    const insta = (
      <div className="item">
        <Link to="/instagram"> <Icon name='instagram' /> Instagram </Link>
      </div>
    )
    const favs = (
      <div className="item">
        <Link to="/favorites"> <Icon name='star' /> Favorites </Link>
      </div>
    )
    const settings = (
      <div className="item">
        <Link to="/settings"> <Icon name='cog' /> Settings </Link>
      </div>
    )

    const loginButton = userLogged
      ? (<button className="item" onClick={this.dispatchLogout}>
          <Icon name='sign out' /> Sign-out
        </button>)
      : (<div className="item">
          <Link to="/login"> <Icon name='user' /> Login </Link>
        </div>)


    if(userLogged) {
      return (
        <Dropdown
          trigger={trigger}
          // onChange={this.handleChange}
          floating
          icon={null} >
          <Dropdown.Menu className={this.props.settings.darkmode ? 'inverted' : ''}>
            <Dropdown.Header icon='user circle' content={this.props.login.user.social_name || this.props.login.user.username} />
            <Dropdown.Divider />
            { news }
            { insta }
            { favs }
            { settings }
            <Dropdown.Divider />
            { loginButton }
          </Dropdown.Menu>
        </Dropdown>
      )
    } else {
      return (
        <Dropdown
          trigger={trigger}
          // onChange={this.handleChange}
          floating
          icon={null} >
          <Dropdown.Menu className={this.props.settings.darkmode ? 'inverted' : ''}>
            { news }
            { insta }
            <Dropdown.Divider />
            { loginButton }
          </Dropdown.Menu>
        </Dropdown>
      )
    }
  })

  // handleChange = (e, { value }) => {
  //   if (value) {
  //
  //   }
  //   console.log('handling change', value)
  // }

  render() {
    return (
      <Menu borderless fluid fixed="top"
        inverted={this.props.settings.darkmode}
        className="main-menu">
        <div className="item">
          {this.loginButton(this.props.login.user)}
        </div>
        <Menu.Item> posterest </Menu.Item>
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
