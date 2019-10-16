import React from 'react';
import { Grid, Segment, Button, Icon, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Noty from 'notifier'
import { connect } from 'react-redux'
import api from 'api'

class SigninGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: '',
      pword: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUNChange = this.handleUNChange.bind(this)
    this.handlePWChange = this.handlePWChange.bind(this)
    this.notificationDOMRef = React.createRef();
  }

  handleUNChange(event) {
    this.setState({uname: event.target.value});
  }

  handlePWChange(event) {
    this.setState({pword: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('here I go')
    let credentials = {
      body: JSON.stringify({
        username: this.state.uname,
        password: this.state.pword
      })
    }
    api('/login').post(credentials).then((data) => {
      this.props.dispatch({
        type:'SET_SETTINGS',
        prefs: data.prefs
      })
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

  handleGoogleSignin = () => {
    window.open(api().getAPI() + "/login-google", "_self");
  }

  handleFbSignin = () => {
    window.open(api().getAPI() + "/login-fb", "_self");
  }

  componentDidMount() {
    if(!this.props.login.user || !this.props.login.count) {
      api('/profile').get().then(data => {
        console.log('componentDidMount @ SignInGrid')
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
        console.log('oops', oops)
      })
    }
  }

  render() {
    console.log('rendering SignInG')
    if(this.props.login.user){
      this.props.history.push("/profile")
      return null
    } else {
      return (
        <Segment basic style={{'height': '100vh'}}>
          <Grid padded>
            <Grid.Row>
              <Grid.Column computer={4} mobile={1}>
              </Grid.Column>
              <Grid.Column computer={8} mobile={14}>
                <Segment padded>
                  <h3> Login to post e-rest </h3>
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
                      content="Log in"
                      color="red"
                      type="submit"
                      basic/>
                  </Form>
                  <Grid padded>
                    <Grid.Row>
                    <Button fluid color='facebook' onClick={this.handleFbSignin}>
                      <Icon name='facebook' /> Login with Facebook
                    </Button>
                    </Grid.Row>
                    <Grid.Row>
                    <Button fluid color='google plus' onClick={this.handleGoogleSignin}>
                      <Icon name='google' /> Login with Google
                    </Button>
                    </Grid.Row>
                  </Grid>
                  <Segment fluid="true" basic textAlign="center">
                    <Link to="/signup"> Take me to signup instead! </Link>
                  </Segment>
                </Segment>
              </Grid.Column>
              <Grid.Column computer={4} mobile={1}>
              </Grid.Column>
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
    login: state.login
  }
}

export default connect(mapStateToProps)(SigninGrid)
