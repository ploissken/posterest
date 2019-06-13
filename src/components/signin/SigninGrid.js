import React from 'react';
import { Grid, Segment, Input, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'

class SigninGrid extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Segment basic style={{'height': '100vh'}}>
        <Grid padded columns={3}>
          <Grid.Row>
            <Grid.Column>
            </Grid.Column>
            <Grid.Column>
              <Segment padded>
                <h3> Login to post e-rest </h3>
                <Grid padded>
                  <Grid.Row fluid>
                    <Input style={{'width': '100%'}} placeholder="username" />
                  </Grid.Row>
                  <Grid.Row>
                    <Input style={{'width': '100%'}} placeholder="password" type="password"/>
                  </Grid.Row>
                  <Grid.Row>
                    <Button fluid content="Login" color="red" basic/>
                  </Grid.Row>
                  <Grid.Row>
                  <Button fluid color='facebook'>
                    <Icon name='facebook' /> Login with Facebook
                  </Button>
                  </Grid.Row>
                  <Grid.Row>
                  <Button fluid color='google plus'>
                    <Icon name='google' /> Login with Google
                  </Button>
                  </Grid.Row>
                </Grid>
                <Segment fluid basic textAlign="center">
                  <a href="/signup"> Take me to signup instead! </a>
                </Segment>
              </Segment>
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    settings: state.settings
  }
}

export default connect(mapStateToProps)(SigninGrid)
