import React from 'react';
import Card from './NewsCard'
import { Grid, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'

const loadingStyle = {
  height: '100vh'
}

class NewsGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      news: {
        columns: [],
        rows: []
      }
    }
  }

  createCards(data) {
    let cols = []
    let rows = []

    data.forEach(post => {
      let postCard = <Card data={post}/>
      cols.push(<Grid.Column key={post._id} children={postCard}/>)
      rows.push(<Grid.Row style={{ 'padding': '0' }} key={post._id}><Grid.Column key={post._id} children={postCard}/></Grid.Row>)
    })
    // for(var i = 0; i < 11; i++) {
    //   let postCard = <Card data={data[i]}/>
    //   cols.push(<Grid.Column key={data[i]._id} children={postCard}/>)
    // }
    console.log('news', data[0])
    this.setState({ news: { columns: cols, rows: rows } })
  }

  componentDidMount() {
    // TODO: fix this workaround
    // var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    let targetUrl = 'https://pa.txto.com.br/news'
    // let targetUrl = 'http://pa.localhost/news'
    // fetch(proxyUrl + targetUrl)
    fetch(targetUrl)
    .then(res => res.json())
    .then((data) => {
      console.log(`creating ${data.length} cards`)
      this.createCards(data)
    })
    .catch(console.log)
  }

  render() {
    console.log('rendering News')
    if (!this.state.news.columns.length) {
      console.log('rendering without data')
      return(<Segment style={loadingStyle} basic color="brown" size="massive" loading />)
    } else {
      console.log('rendering with data')
      if(this.props.settings.listview) {
        return (
          <Segment basic>
            <Grid padded>
              {this.state.news.rows}
            </Grid>
          </Segment>
        )
      } else {
        return (
          <Segment basic>
            <Grid stackable padded columns={5}>
              {this.state.news.columns}
            </Grid>
          </Segment>
        )
      }
    }
  }
}
const mapStateToProps = (state) => {
  return {
    settings: state.settings
  }
}

export default connect(mapStateToProps)(NewsGrid)
