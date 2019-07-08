import React from 'react'
import { Grid, Segment, Icon, Checkbox, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import api from 'api'

class SettingsGrid extends React.Component {
  darkModeUpdate = (e => {
    e.preventDefault()
    let param = {
      body: JSON.stringify({
        darkmode: !this.props.settings.darkmode
      })
    }
    api('/toggle-darkmode').post(param).then(data => {
      console.log('toggle-darkmode @ SettingsGrid')
      console.log(data)
      this.props.dispatch({
        type:'CHANGE_DARK_MODE'
      })
    }).catch(oops => {
      console.log('oops', oops)
    })
  })

  viewModeUpdate = (e => {
    e.preventDefault()
    let param = {
      body: JSON.stringify({
        listview: !this.props.settings.listview
      })
    }
    api('/toggle-viewmode').post(param).then(data => {
      console.log('toggle-viewmode @ SettingsGrid')
      console.log(data)
      this.props.dispatch({
        type:'CHANGE_VIEW_MODE'
      })
    }).catch(oops => {
      console.log('oops', oops)
    })
  })

  render() {
    console.log('rendering SignInG')
    return (
      <Segment basic style={{'height': '100vh'}} >
        <Grid padded>
          <Grid.Row>
            <Grid.Column width={3}></Grid.Column>
            <Grid.Column width={10}>
              <Segment basic inverted={this.props.settings.darkmode}>
                <h3> Settings </h3>
                <Grid padded>
                  <Grid.Row>
                    <h4> Theme </h4>
                  </Grid.Row>
                  <Grid.Row>
                    <Checkbox toggle
                      label="Dark theme"
                      onChange={this.darkModeUpdate}
                      checked={this.props.settings.darkmode}/>
                  </Grid.Row>
                    Display high contrast text against a dark background: saves energy and its pretty cool
                  <Grid.Row>
                    <h4> News Grid </h4>
                  </Grid.Row>
                  <Grid.Row>
                    <Button
                      inverted={this.props.settings.darkmode}
                      onClick={this.viewModeUpdate}
                      basic>
                      <Icon
                        name={this.props.settings.listview ? 'list' : 'th'}
                      /> {this.props.settings.listview ? 'Displaying as a list' : 'Displaying as cards'}
                    </Button>
                  </Grid.Row>
                  You can change the way your News Feed is displayed: headlines list or a masonry cards view
                </Grid>
              </Segment>
            </Grid.Column>
            <Grid.Column width={3}></Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    settings: state.settings,
    login: state.login
  }
}

export default connect(mapStateToProps)(SettingsGrid)
