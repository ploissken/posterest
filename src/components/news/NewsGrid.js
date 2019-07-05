import React from 'react';
import Card from './NewsCard'
import { Grid, Segment, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import api from 'api'

const loadingStyle = {
  height: '100vh'
}

class NewsGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingMore: false
    }
  }

  parseItems(data) {
    return new Promise(async (resolve, reject) => {
      let cols = []
      let rows = []

      data.forEach(post => {
        let postCard = <Card data={post}/>
        cols.push(<Grid.Column key={post._id} children={postCard}/>)
        rows.push(<Grid.Row style={{ 'padding': '0' }} key={post._id}><Grid.Column key={post._id} children={postCard}/></Grid.Row>)
      })
      resolve({ columns: cols, rows: rows })
    })
  }

  loadMore = () => {
    this.setState({ loadingMore: true })
    let info = {
      body: JSON.stringify({
        date: this.props.dataset.paginationDate.news
      })
    }

    api('/load-more-news').post(info).then((data) => {
      this.parseItems(data).then(parsed => {
        console.log('load-more-news', parsed)
        let date = new Date(this.props.dataset.paginationDate.news.getTime())
        date.setDate(date.getDate() - 1)
        this.props.dispatch({
          type:'NEXT_PG_NEWS_DATE',
          pgDate: date
        })
        this.props.dispatch({
          type:'ADD_PARSED_POSTS',
          nRows: parsed.rows,
          nCols: parsed.columns
        })
        this.setState({ loadingMore: false })
      }).catch(err => {
        console.log(err)
      })
    })
  }

  componentDidMount() {
    if (!this.props.dataset.paginationDate.news) {
      let date = new Date()
      this.props.dispatch({
        type:'NEXT_PG_NEWS_DATE',
        pgDate: date
      })

      api('/news').get().then((data) => {
        this.parseItems(data).then(parsed => {
          console.log('parsed', parsed)
          this.props.dispatch({
            type:'ADD_PARSED_POSTS',
            nRows: parsed.rows,
            nCols: parsed.columns
          })

        }).catch(err => {
          console.log(err)
        })
      })
    }
  }

  render() {
    console.log('rendering News')
    if (!this.props.dataset.news.columns.length) {
      console.log('rendering without data')
      return(<Segment style={loadingStyle} basic color="brown" size="massive" loading />)
    } else {
      console.log('rendering with data')
      if(this.props.settings.listview) {
        return (
          <Segment basic>
            <Grid padded>
              {this.props.dataset.news.rows}
              <Grid.Row centered>
                <Button
                  className={this.state.loadingMore ? 'disabled loading' : ''}
                  onClick={this.loadMore}> load more </Button>
              </Grid.Row>
            </Grid>
          </Segment>
        )
      } else {
        return (
          <Segment basic>
            <Grid stackable padded columns={5}>
              {this.props.dataset.news.columns}
            </Grid>
          </Segment>
        )
      }
    }
  }
}
const mapStateToProps = (state) => {
  return {
    settings: state.settings,
    dataset: state.dataset
  }
}

export default connect(mapStateToProps)(NewsGrid)
