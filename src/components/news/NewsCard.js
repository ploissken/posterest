import React from 'react'
import { Card, Image, Segment, TransitionablePortal } from 'semantic-ui-react'
import FavButton from 'components/commons/FavButton'
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
    timeZone: 'UTC',
    day: 'numeric',
    month: 'long',
    year: 'numeric' })
}

const iteractions = {
  'fontSize': '0.7em',
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
  render() {
    if(this.props.settings.listview && !this.props.compact) {
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
          <Segment basic textAlign='left'>
            <h4>
              <a href={this.props.data.href}>
                {this.props.data.title || '?'}
              </a>
            </h4>
          </Segment>
          <FavButton
            compact={this.props.settings.listview}
            postID={this.props.data._id} />
        </Segment.Group>
      )
    } else {
      return (
        <Card style={this.props.settings.darkmode ? invSegment : nomargin}>
          <Card.Content>
            <Card.Header>{this.props.data.title || '?'}</Card.Header>
            <Image
              src={this.props.data.img}
              size='medium'
              ui={true} />
            <Card.Meta>
              <span style={iteractions}>
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
            <FavButton
              postID={this.props.data._id} />
          </Card.Content>
        </Card>
      )
    }
  }
}
const mapStateToProps = (state) => {
  return {
    settings: state.settings
  }
}

export default connect(mapStateToProps)(NewsCard)
