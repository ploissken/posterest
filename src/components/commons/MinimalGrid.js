import React from 'react';
import FavButton from 'components/commons/FavButton'
import LoadMoreNews from 'components/commons/LoadMoreNews'
// import SimpleTable from 'components/commons/SimpleTable'
import { Item, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import api from 'api'

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
    return ''
  }
}
class MinimalGrid extends React.Component {
    render() {

      const neo = this.props.dataset.news.raw.map(post => {
        const favButton = post.href === ""
          ? ( <span></span> )
          : ( <FavButton compact="true" postID={post._id} /> )

        const title = post.href === ""
          ? ( <Item.Description className="minimal news header"> {post.title} </Item.Description> )
          : ( <Item.Description>
                <a href={post.href}> {post.title} </a> | {getSource(post.href)}
              </Item.Description> )

        return (
          <Item className="minimal news row" key={post._id}>
            { favButton }
            <Item.Content>
              { title }
            </Item.Content>
          </Item>
        )
      })

      return (
        <Segment basic style={{ 'overflow': 'auto', 'height': '95vh', 'border': '1px solid red;' }}>
          <Item.Group unstackable>
            {neo}
          </Item.Group>
          <LoadMoreNews />
        </Segment>
      )
  }
}
const mapStateToProps = (state) => {
  return {
    dataset: state.dataset,
  }
}

export default connect(mapStateToProps)(MinimalGrid)
