import React from 'react'
import { Card, Icon, Image, Segment, TransitionablePortal } from 'semantic-ui-react'
import { connect } from 'react-redux'

const cardDescStyle = {
  overflow: 'auto',
  height: '100px'
}

const cardItemStyle = {
  overflow: 'auto',
  height: '80px',
  'max-width': '60vw'
}

const iteractions = {
  'fontSize': '1em',
  'display': 'block'
}

function dateParse(d) {
  let das = new Date(d).toLocaleString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric' })
    return das
}

class InstaCard extends React.Component {
  render() {
    if(this.props.data && this.props.data.user_info) {
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
                    <a href={this.props.data.url} style={iteractions}>
                      {this.props.data.user_info.user_name || 'err'}
                    </a>
                  </Segment>
                  <Segment vertical>
                    <span className='date' style={iteractions}>
                      {dateParse(this.props.data.time) || 'no data info'}
                    </span>
                  </Segment>
                  <Segment vertical>
                    <span style={iteractions}>
                      {this.props.data.likes || ''} <Icon name='like' />
                      {this.props.data.comments || ''} <Icon name='comment' />
                    </span>
                  </Segment>
                </div>
              </Segment>
            </Segment.Group>
            <Segment>
              <div>
                <Segment vertical>
                  <div style={cardItemStyle}>
                    {this.props.data.caption || 'donno'}
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
        // cards view
        return (
          <Card>
            <Image
              src={this.props.data.img}
              size='medium'
              ui={true} />
            <Card.Content>
              <Card.Header>
              <Image floated='left' size='mini' circular src={this.props.data.user_info.profile_pic} />
                <a href={this.props.data.url}>
                  {this.props.data.user_info.user_name || 'err'}
                </a>
              </Card.Header>
              <Card.Meta>
                <span className='date'>
                  {dateParse(this.props.data.time) || 'no data info'}
                </span>
                <span style={iteractions}>
                  {this.props.data.likes || ''} <Icon name='like' />
                  {this.props.data.comments || ''} <Icon name='comment' />
                </span>
              </Card.Meta>
              <Card.Description style={cardDescStyle}>
                {this.props.data.caption || 'donno'}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Icon name='star' /> Favorite
            </Card.Content>
          </Card>
        )
      }
    } else {
      return(<Segment fluid loading />)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    settings: state.settings
  }
}

export default connect(mapStateToProps)(InstaCard)
