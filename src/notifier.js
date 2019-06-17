import React from 'react'
import ReactNotification from "react-notifications-component"
import "react-notifications-component/dist/theme.css"

// https://github.com/teodosii/react-notifications-component
const config = {
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
}

export class Noty extends React.Component {
  constructor(props) {
    super(props)
    this.notificationDOMRef = React.createRef()
  }

  error (msg) {
    return this.notification({
      title: 'error',
      message: msg,
      type: 'danger'
    })
  }

  info (msg) {
    return this.notification({
      title: 'info',
      message: msg,
      type: 'success'
    })
  }

  notification(specConf) {
    this.notificationDOMRef.current.addNotification({
      ...config,
      ...specConf
    })
  }

  render() {
    return (
      <ReactNotification ref={this.notificationDOMRef}/>
    )
  }
}

const theNoty = new Noty()

export default function () {
  return theNoty
}
