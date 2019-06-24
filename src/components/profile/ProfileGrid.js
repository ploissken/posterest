import React from 'react';
import { Segment, Grid, Statistic, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import api from 'api'
import Noty from 'notifier'

class ProfileGrid extends React.Component {

  componentDidMount() {
    if(!this.props.login.user || !this.props.login.count) {
      api('/profile').get().then(data => {
        console.log('componentDidMount @ ProfileGrid')
        console.log(data)
        this.props.dispatch({
          type:'SET_COUNT',
          count: data.count
        })
        this.props.dispatch({
          type:'USER_LOGIN',
          user: data.user
        })
        this.props.dispatch({
          type:'SET_FAVORITE',
          fav: data.favorites
        })
      }).catch(oops => {
        console.log('catcherrr', oops)
        Noty().error(oops.message)
      })
    }
  }

  render() {
    console.log('rendering ProfileGrid')
    if(!this.props.login.user) {
      this.props.history.push("/login")
      return (
        <Segment basic style={{'height': '100vh'}} loading/>
      )
    } else {
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
                      Post e-rest counts with:
                    </Grid.Row>
                    <Grid.Row>
                      <Statistic.Group size='small'>
                        <Statistic color="red" size='small'>
                          <Statistic.Value>{this.props.login.count.news}</Statistic.Value>
                          <Statistic.Label><Icon name='newspaper outline' />Blog posts</Statistic.Label>
                        </Statistic>
                        <Statistic color="teal" size='small'>
                          <Statistic.Value>
                            {this.props.login.count.instagram}
                          </Statistic.Value>
                          <Statistic.Label><Icon name='instagram' />Instagram posts</Statistic.Label>
                        </Statistic>
                      </Statistic.Group>
                    </Grid.Row>
                    <Grid.Row>
                      You have
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column textAlign="center">
                        <Statistic color="brown" size='small'>
                          <Statistic.Value>
                            {this.props.favorites.ids.length}
                          </Statistic.Value>
                          <Statistic.Label><Icon name='star' />favorites</Statistic.Label>
                        </Statistic>
                      </Grid.Column>
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
