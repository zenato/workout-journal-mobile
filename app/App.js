import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { successSignIn } from './state/actions/users'
import { Initializer, SignedIn, SignedOut } from './routes'
import { getAccessToken } from './lib/auth'
import { fetchLoggedInfo } from './lib/api'

type Props = {
  accessToken: any,
  successSignIn: () => void,
}

class App extends Component<Props> {
  state = {
    initialized: false,
  }

  async componentDidMount() {
    const accessToken = await getAccessToken()
    if (accessToken) {
      try {
        const loggedInfo = await fetchLoggedInfo(accessToken)
        this.props.successSignIn({ accessToken, loggedInfo })
      } catch (e) {} // eslint-disable-line
    }
    this.setState({ initialized: true })
  }

  render() {
    const { accessToken } = this.props
    const { initialized } = this.state

    if (!initialized) {
      return <Initializer />
    }
    return accessToken ? <SignedIn /> : <SignedOut />
  }
}

export default connect(
  state => ({
    accessToken: state.users.accessToken,
  }),
  dispatch => ({
    ...bindActionCreators({ successSignIn }, dispatch),
  }),
)(App)
