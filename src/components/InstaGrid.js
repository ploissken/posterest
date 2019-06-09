import React from 'react';
import Card from './InstaCard'
import { Grid, Segment } from 'semantic-ui-react'

const loadingStyle = {
  height: '100vh'
}

class InstaGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      instagram: { columns: [] }
    }
  }

  createCards(data) {
    let table = []

    data.forEach(post => {
      let postCard = <Card data={post}/>
      table.push(<Grid.Column key={post._id} children={postCard}/>)
    })
    // for(var i = 0; i < 11; i++){
    //   let postCard = <Card data={data[i]}/>
    //   table.push(<Grid.Column key={data[i]._id} children={postCard}/>)
    // }
    console.log(data[0])
    this.setState({ instagram: { columns: table } })
  }

  componentDidMount() {
    // TODO: fix this workaround
    // var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        // targetUrl = 'https://pa.txto.com.br/instagram'
    let targetUrl = 'http://pa.localhost/instagram'
    // fetch(proxyUrl + targetUrl) // running local
    fetch(targetUrl) // running on deploy
    .then(res => res.json())
    .then((data) => {
      console.log(`creating ${data.length} cards`)
      this.createCards(data)
    })
    .catch(console.log)
  }

  render() {
    console.log('rendering InstaGrid')
    if (!this.state.instagram.columns.length) {
      console.log('rendering without data')
      return(<Segment style={loadingStyle} basic color="brown" size="massive" loading />)
    } else {
      console.log('rendering with data')
      return (
        <Segment basic>
          <Grid stackable padded columns={5}>
            {this.state.instagram.columns}
          </Grid>
        </Segment>
      )
    }
  }
}

export default InstaGrid
