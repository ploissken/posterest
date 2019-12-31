import React from 'react'
import NewsCard from 'components/news/NewsCard'
import InstaCard from 'components/instagram/InstaCard'
import { Grid, Segment } from 'semantic-ui-react'
import {connect} from 'react-redux'
import api from 'api'

class FavsGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      news: {
        rows: []
      }
    }
  }

  // loadMore = () => {
  //   this.setState({ loadingMore: true })
  //   let info = {
  //     body: JSON.stringify({
  //       total: this.props.favorites.ids.length
  //     })
  //   }
  //
  //   api('/load-more-favs').post(info).then((data) => {
  //     this.parseItems(data).then(parsed => {
  //       console.log('load-more-favs', parsed)
  //       let date = new Date(this.props.dataset.paginationDate.news.getTime())
  //       date.setDate(date.getDate() - 1)
  //       this.props.dispatch({
  //         type:'NEXT_PG_NEWS_DATE',
  //         pgDate: date
  //       })
  //       this.props.dispatch({
  //         type:'ADD_PARSED_POSTS',
  //         nRows: parsed.rows,
  //         nCols: parsed.columns
  //       })
  //       this.setState({ loadingMore: false })
  //     }).catch(err => {
  //       console.log(err)
  //     })
  //   })
  // }

  createCards(data) {
    let rows = []

    let allFavs = [...data.news, ...data.instagram].sort((a, b) => {
      return new Date(a.time) - new Date(b.time)
    })

    allFavs.forEach(post => {
      let postCard = post.caption
        ? <InstaCard data={post}/>
        : <NewsCard data={post} compact={true}/>

      rows.push(<Grid.Column key={post._id} children={postCard}/>)
      // rows.push(<Grid.Row style={{ 'padding': '0' }} key={post._id}><Grid.Column key={post._id} children={postCard}/></Grid.Row>)
    })
    // console.log('news', data[0])
    this.setState({ news: { rows: rows } })
  }

  componentDidMount() {
    if(this.props.login.user) {
      api('/load-favs').get().then((data) => {
        // console.log('UIA')
        // console.log(data)
        this.createCards(data)
        this.props.dispatch({
          type:'SET_FETCHED_FAVS',
          fetched: data
        })
      }).catch(oops => {
        // console.log('catcherrr', oops)
      })
    }
  }

  render() {
    // console.log('rendering favs')
    if(!this.props.login.user) {
      this.props.history.push("/login")
      return (
        <Segment basic style={{'height': '100vh'}} loading/>
      )
    } else {
      return (
        <Segment basic>
          <Grid stackable padded columns={5}>
            {this.state.news.rows}
          </Grid>
        </Segment>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    favorites: state.favorites
  }
}

export default connect(mapStateToProps)(FavsGrid)
