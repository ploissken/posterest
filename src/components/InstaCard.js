import React from 'react'
import { Card, Icon, Image, Segment } from 'semantic-ui-react'

const cardDescStyle = {
  overflow: 'auto',
  height: '100px'
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
    } else {
      return(<Segment loading />)
    }
  }
}

export default InstaCard
