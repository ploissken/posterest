import React from 'react';
import { Segment, Grid, Statistic, Icon, Table } from 'semantic-ui-react'
import SimpleTable from 'components/commons/SimpleTable'
import { connect } from 'react-redux'

const rightAligned = {
  'textAlign': 'right',
  'paddingRight' : '10px'
}

class ProfileGrid extends React.Component {
  render() {
    console.log('rendering ProfileGrid')
    if(!this.props.login.user) {
      this.props.history.push("/login")
      return (
        <Segment basic style={{'height': '100vh'}} loading/>
      )
    } else {
      let rows = []
      this.props.login.count.news.details.forEach(url => {
        let row = {
          columns: []
        }
        row.columns.push({
          value: url.count,
          style: rightAligned
        })
        row.columns.push({
          value: url.label,
        })

        rows.push(row)
      })

      rows.push({ columns: [{ value: '-----' }] })
      rows.push({ columns: [
        { value: this.props.login.count.news.total, style: rightAligned },
        { value: 'blog posts' },
      ] })
      rows.push({ columns: [
        { value: this.props.login.count.instagram.total, style: rightAligned },
        { value: 'instagram posts' },
      ] })


      return (
        <Segment basic style={{'height': '100vh'}}>
          <Grid padded columns={3}>
            <Grid.Row>
              <Grid.Column></Grid.Column>
              <Grid.Column>
                <Segment padded>
                  <h3> Welcome {this.props.login.user.social_name || this.props.login.user.username}!</h3>
                  <Grid padded>
                    <Grid.Row>
                      posterest
                    </Grid.Row>

                    <Grid.Row>
                      <SimpleTable rows={rows} />
                    </Grid.Row>
                    <Grid.Row>
                      <Icon name='star' /> {this.props.favorites.ids.length} favorites
                    </Grid.Row>

                  </Grid>
                </Segment>
              </Grid.Column>
              <Grid.Column></Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    settings: state.settings,
    login: state.login,
    favorites: state.favorites
  }
}

export default connect(mapStateToProps)(ProfileGrid)
