import React from 'react'
import { Card, Icon, Image, Segment, TransitionablePortal } from 'semantic-ui-react'
import { connect } from 'react-redux'

function getSource(url) {
  try {
    let clear = url
      .replace('http://', '')
      .replace('https://', '')
      .replace('www.', '')
      .replace('www1.', '')
      .replace(/-/g, '')
      .match(/(.*?)\//)
    return clear[0].replace('/', '')
  } catch (e) {
    console.log('error', url)
    return 'error :('
  }
}

function dateParse(d) {
  return new Date(d).toLocaleString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric' })
}

const iteractions = {
  'fontSize': '1em',
  'display': 'block'
}

const nomargin = {
  'marginBottom': '0'
}

const invSegment = {
  'marginBottom': '0',
  'backgroundColor': '#333'
}

class NewsCard extends React.Component {
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
      fetch('http://pa.localhost/toggle-fav', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: user,
          item: { _id: itemID }
        })
      })
      .then(res => {
        if(res.status === 200) {
          console.log(res)
          res.json().then(f => {
            console.log('alright')
            console.log(f)
            if(f.message && f.message === 'unfavorited') {
              this.props.dispatch({
                type: 'REM_FAVORITE',
                fav: { nid: itemID }
              })
            } else {
              this.props.dispatch({
                type: 'ADD_FAVORITE',
                fav: f
              })
            }
            this.setState({ loading: false })
          })
        } else {
          console.log('something wrong with this banana')
          console.log(res)
          console.log(res.data)
          res.json().then(d => {
            console.log(d)
          })
        }
      })
      .catch(err => {
        console.log('err', err)
      })
    }
  }

  favIcon() {
    return this.state.loading
      ? 'spinner'
      : this.props.favorites.find(e => e.nid === this.props.data._id)
        ? 'check'
        : 'star'
  }

  render() {
    if(this.props.settings.listview) {
      return (
        <Segment.Group horizontal
          size="mini" compact
          style={this.props.settings.darkmode ? invSegment : nomargin}>
          <Segment style={{ 'maxWidth': '100px' }}>
            <TransitionablePortal
              closeOnTriggerClick
              onOpen={this.handleOpen}
              onClose={this.handleClose}
              openOnTriggerClick
              trigger={
                <Image src={this.props.data.img} size='tiny' ui={true} />
              }
            >
              <Segment style={{ right: '10%', position: 'fixed', top: '10%', zIndex: 1000 }}>
                <Image src={this.props.data.img} size="large" ui={true} />
              </Segment>
            </TransitionablePortal>
          </Segment>
          <Segment style={{ 'maxWidth': '200px' }}>
            <span className='date'>
              @<a href={this.props.data.href}>
                {getSource(this.props.data.href)}
              </a>
            </span>
            <span style={iteractions}>
              {dateParse(this.props.data.time) || 'no data info'}
            </span>
          </Segment>
          <Segment basic>
            <h4>
              <a href={this.props.data.href}>
                {this.props.data.title || '?'}
              </a>
            </h4>
          </Segment>
          <Segment textAlign='right' style={{ 'maxWidth': '50px' }}>
            <Icon
              color="yellow"
              loading={this.state.loading}
              name={this.favIcon()}
              onClick={() => this.saveFav(this.props.login.user, this.props.data._id)}
            />
          </Segment>
        </Segment.Group>
      )
    } else {
      return (
        <Card>
          <Image
            src={this.props.data.img}
            size='medium'
            ui={true} />
          <Card.Content>
            <Card.Header>{this.props.data.title || '?'}</Card.Header>
            <Card.Meta>
              <span className='date'>
                @<a href={this.props.data.href}>
                  {getSource(this.props.data.href)}
                </a>
              </span>
              <span style={iteractions}>
                {dateParse(this.props.data.time) || 'no data info'}
              </span>
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
              <Icon name='star' /> Favorite
          </Card.Content>
        </Card>
      )
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

export default connect(mapStateToProps)(NewsCard)
