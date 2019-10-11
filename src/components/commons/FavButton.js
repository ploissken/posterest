import React from 'react'
import { Icon, Segment, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import api from 'api'

class FavButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  saveFav(user, itemID) {
    if(user && user._id) {
      console.log(`user id ${user._id} favs ${itemID}`)
      this.setState({ loading: true })
      let info = {
        body: JSON.stringify({
          user: user,
          item: { _id: itemID }
        })
      }
      api('/toggle-fav').post(info).then(data => {
        if(data.message && data.message === 'unfavorited') {
          this.props.dispatch({
            type: 'REM_FAVORITE',
            fav: { nid: itemID }
          })
        } else {
          this.props.dispatch({
            type: 'ADD_FAVORITE',
            fav: data
          })
        }
        this.setState({ loading: false })
      }).catch(err => console.log(err))
    }
  }

  favIcon() {
    return this.props.login.user
      ? (this.state.loading
        ? 'star'
        : this.props.favorites.ids.find(e => e.nid === this.props.postID)
          ? 'star'
          : 'star outline')
      : ''
  }

  render() {
    if(this.props.postID && this.props.login.user) {
      if(this.props.compact) {
        return (
          <Segment textAlign='right' basic style={{ 'padding': '0' }}>
            <Icon
              loading={this.state.loading}
              size="large"
              name={this.favIcon()}
              onClick={() => this.saveFav(this.props.login.user, this.props.postID)}
            />
          </Segment>
        )
      } else {
        return (
          <Button
            basic
            className={this.props.settings.darkmode ? 'red inverted' : ''}
            onClick={() => this.saveFav(this.props.login.user, this.props.postID)}>
            <Icon
              color="yellow"
              loading={this.state.loading}
              name={this.favIcon()}
            /> Favorite
          </Button>
        )
      }
    } else {
      return null
    }
  }
}
const mapStateToProps = (state) => {
  return {
    settings: state.settings,
    favorites: state.favorites,
    login: state.login
  }
}

export default connect(mapStateToProps)(FavButton)
