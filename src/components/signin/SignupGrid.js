import React from 'react'
import { Grid, Segment, Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import api from 'api'
import Noty from 'notifier'

class SigninGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uname: '',
      pword: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUNChange = this.handleUNChange.bind(this)
    this.handlePWChange = this.handlePWChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    let credentials = {
      body: JSON.stringify({
        username: this.state.uname,
        password: this.state.pword
      })
    }
    api('/signup').post(credentials).then((data) => {
      console.log('/signup data', data)
      this.props.dispatch({
        type:'USER_LOGIN',
        user: data
      })
      this.props.history.push('/favorites')
    }).catch(oops => {
      Noty().error(oops.message)
    })
  }

  handleUNChange(event) {
    this.setState({uname: event.target.value});
  }

  handlePWChange(event) {
    this.setState({pword: event.target.value});
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
                <h3> Sign up to post e-rest </h3>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <input placeholder='username'
                      onChange={this.handleUNChange}
                      value={this.state.uname}/>
                  </Form.Field>
                  <Form.Field>
                    <input placeholder='password'
                    onChange={this.handlePWChange}
                    value={this.state.pword}
                    type="password"/>
                  </Form.Field>
                  <Button
                    fluid
                    content="Create account"
                    color="red"
                    type="submit"
                    basic/>
                </Form>
                <Segment fluid='true' basic textAlign="center">
                  <a href="/login"> I'm mad, take me back to login! </a>
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
