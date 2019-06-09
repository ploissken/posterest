import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

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
              em: <a href={this.props.data.href}>
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

export default NewsCard
