import React from 'react';
import FavButton from 'components/commons/FavButton'
import LoadMoreNews from 'components/commons/LoadMoreNews'
// import SimpleTable from 'components/commons/SimpleTable'
import { Table, Segment } from 'semantic-ui-react'
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
        ? ( <Table.Cell></Table.Cell> )
        : ( <Table.Cell>
              <FavButton compact="true" postID={post._id} />
            </Table.Cell>)

        const title = post.href === ""
        ? ( <Table.Cell className="minimal news header"> {post.title} </Table.Cell> )
        : ( <Table.Cell>
              {post.title} | <a href={post.href}>{getSource(post.href)}</a>
            </Table.Cell>)

        return (
          <Table.Row className="minimal news row" key={post._id}>
            { favButton }
            { title }
          </Table.Row>
        )
      })

      return (
        <Segment basic style={{ 'overflow': 'auto', 'height': '95vh' }}>
          <Table>
            <Table.Body compact="true" basic="very">
              {neo}
            </Table.Body>
          </Table>
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
