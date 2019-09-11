import React, { Component } from 'react'

export default class OAuth extends Component {

  render() {
    return (
      <div>
        <>
          <a href="https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.team,identity.avatar&client_id=672673271492.745892959601"><img alt="Sign in with Slack" height="40" width="172" src="https://platform.slack-edge.com/img/sign_in_with_slack.png" />
          </a>
        </>
      </div>
    )
  }
}
