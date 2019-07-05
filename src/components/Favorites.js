import React from 'react'
import Card from './news/NewsCard'
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

  createCards(data) {
    let rows = []

    data.news.forEach(post => {
      let postCard = <Card data={post}/>
      rows.push(<Grid.Row style={{ 'padding': '0' }} key={post._id}><Grid.Column key={post._id} children={postCard}/></Grid.Row>)
    })
    console.log('news', data[0])
    this.setState({ news: { rows: rows } })
  }

  componentDidMount() {
    if(this.props.login.user) {
      api('/load-favs').get().then((data) => {
        console.log('UIA')
        console.log(data)
        this.createCards(data)
        this.props.dispatch({
          type:'SET_FETCHED_FAVS',
          fetched: data
        })
      }).catch(oops => {
        console.log('catcherrr', oops)
      })
    }
  }

  render() {
    console.log('rendering favs')
    if(!this.props.login.user) {
      this.props.history.push("/login")
      return (
        <Segment basic style={{'height': '100vh'}} loading/>
      )
    } else {
      return (
        <Segment basic style={{'minHeight': '100vh'}}>
          <Grid padded>
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
