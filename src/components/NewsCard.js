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

class NewsCard extends React.Component {
  render() {
    if(this.props.settings.listview) {
      return (
        <Segment.Group horizontal>
          <Segment.Group horizontal>
            <Segment>
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
            <Segment>
              <div>
                <Segment vertical>
                  <span className='date'>
                    @<a href={this.props.data.href}>
                      {getSource(this.props.data.href)}
                    </a>
                  </span>
                </Segment>
                <Segment vertical>
                  <span style={iteractions}>
                    {dateParse(this.props.data.time) || 'no data info'}
                  </span>
                </Segment>
              </div>
            </Segment>
          </Segment.Group>
          <Segment>
            <div>
              <Segment vertical>
                <div>
                  {this.props.data.title || '?'}
                </div>
              </Segment>
              <Segment vertical>
                <Icon name='star' /> Favorite
              </Segment>
            </div>
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
    settings: state.settings
  }
}

export default connect(mapStateToProps)(NewsCard)
