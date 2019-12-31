import React from 'react';
import FavButton from 'components/commons/FavButton'
import LoadMoreNews from 'components/commons/LoadMoreNews'
// import SimpleTable from 'components/commons/SimpleTable'
import { Grid, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
// import api from 'api'

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
    // console.log('error', url)
    return ''
  }
}
class MinimalGrid extends React.Component {
    render() {

      const neo = this.props.dataset.news.raw.map(post => {
        const favButton = post.href === "DATE-MARKER"
          ? ( <Grid.Column width={1}></Grid.Column> )
          : ( <Grid.Column width={1}><FavButton compact="true" postID={post._id} /></Grid.Column> )

        const title = post.href === "DATE-MARKER"
          ? ( <Grid.Column width={15} className="minimal news header"> {post.title} </Grid.Column> )
          : ( <Grid.Column width={15}>
                <a href={post.href}> {post.title} </a> | {getSource(post.href)}
              </Grid.Column> )

        return (
          <Grid.Row className="" key={post._id}>
            { favButton }
            { title }
          </Grid.Row>
        )
      })

      return (
        <Segment basic style={{ 'overflow': 'auto', 'height': '95vh' }}>
          <Grid inverted={this.props.settings.darkmode}>
            {neo}
          </Grid>
          <LoadMoreNews />
        </Segment>
      )
  }
}
const mapStateToProps = (state) => {
  return {
    dataset: state.dataset,
    settings: state.settings
  }
}

export default connect(mapStateToProps)(MinimalGrid)
