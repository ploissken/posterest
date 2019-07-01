import React from 'react';
import Card from './InstaCard'
import { Grid, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import api from 'api'

const loadingStyle = {
  height: '100vh'
}

class InstaGrid extends React.Component {
  parseItems(data) {
    return new Promise(async (resolve, reject) => {
      let cols = []
      let rows = []

      data.forEach(post => {
        let postCard = <Card data={post}/>
        cols.push(<Grid.Column key={post._id} children={postCard}/>)
        rows.push(<Grid.Row key={post._id}><Grid.Column key={post._id} children={postCard}/></Grid.Row>)
      })
      resolve({ columns: cols, rows: rows })
    })
  }

  componentDidMount() {
    console.log('mounting', this.props.dataset.paginationDate)
    if (!this.props.dataset.paginationDate.instagram) {
      let date = new Date()
      date.setDate(date.getDate() - 1)
      this.props.dispatch({
        type:'NEXT_PG_INSTA_DATE',
        pgDate: date
      })

      api('/instagram').get().then((data) => {
        this.parseItems(data).then(parsed => {
          console.log('parsed', parsed)
          this.props.dispatch({
            type:'ADD_PARSED_INSTA_POSTS',
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
    console.log('rendering InstaGrid')
    if (!this.props.dataset.instagram.columns.length) {
      console.log('rendering without data')
      return(<Segment style={loadingStyle} basic color="brown" size="massive" loading />)
    } else {
      console.log('rendering with data')
      if(this.props.settings.listview) {
        return (
          <Segment basic>
            <Grid padded>
              {this.props.dataset.instagram.rows}
            </Grid>
          </Segment>
        )
      } else {
        return (
          <Segment basic>
            <Grid stackable padded columns={5}>
              {this.props.dataset.instagram.columns}
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

export default connect(mapStateToProps)(InstaGrid)
