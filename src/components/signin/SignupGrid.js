import React from 'react';
import { Grid, Segment, Button, Form } from 'semantic-ui-react'
import ReactNotification from "react-notifications-component"
import "react-notifications-component/dist/theme.css"
import { connect } from 'react-redux'

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

  handleSubmit(event) {
    event.preventDefault()
    fetch('http://pa.localhost/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.uname,
        password: this.state.pword
      })
    })
    .then(res => {
      if(res.status === 200) {
        res.json().then(d => {
          console.log('finally')
          console.log(d)
          this.props.dispatch({
            type:'USER_LOGIN',
            user: d
          })
          this.props.history.push('/news')
        })
      } else {
        console.log('something wrong with this banana')
        console.log(res)
        console.log(res.data)
        res.json().then(d => {
          this.notificationDOMRef.current.addNotification({
            title: "error",
            message: d.message,
            type: "danger",
            insert: "bottom",
            container: "bottom-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            slidingEnter: {
              duration: 200,
              cubicBezier: "cubic-bezier(0.215, 0.61, 0.355, 1)",
              delay: 0
            },
            slidingExit: {
              duration: 300,
              cubicBezier: "cubic-bezier(0.215, 0.61, 0.355, 1)",
              delay: 0
            },
            dismiss: { duration: 2000 },
            dismissable: { click: true }
          });
          console.log(d)
        })
      }
    })
    .catch(err => {
      console.log('err', err)
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
        <ReactNotification ref={this.notificationDOMRef} />
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
