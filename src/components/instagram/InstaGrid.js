import React from 'react';
import Card from './InstaCard'
import { Grid, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import api from 'api'

const loadingStyle = {
  height: '100vh'
}

class InstaGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      instagram: {
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
      rows.push(<Grid.Row key={post._id}><Grid.Column key={post._id} children={postCard}/></Grid.Row>)
    })
    // for(var i = 0; i < 11; i++){
    //   let postCard = <Card data={data[i]}/>
    //   cols.push(<Grid.Column key={data[i]._id} children={postCard}/>)
    //   rows.push(<Grid.Row key={data[i]._id}><Grid.Column key={data[i]._id} children={postCard}/></Grid.Row>)
    // }
    this.setState({ instagram: { columns: cols, rows: rows } })
  }

  componentDidMount() {
    api('/instagram').get().then(data => {
      this.createCards(data)
    }).catch(console.log)
  }

  render() {
    console.log('rendering InstaGrid')
    if (!this.state.instagram.columns.length) {
      console.log('rendering without data')
      return(<Segment style={loadingStyle} basic color="brown" size="massive" loading />)
    } else {
      console.log('rendering with data')
      if(this.props.settings.listview) {
        return (
          <Segment basic>
            <Grid padded>
              {this.state.instagram.rows}
            </Grid>
          </Segment>
        )
      } else {
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
}

const mapStateToProps = (state) => {
  return {
    settings: state.settings
  }
}

export default connect(mapStateToProps)(InstaGrid)
