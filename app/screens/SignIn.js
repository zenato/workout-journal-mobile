import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { View, TextInput, Alert, StyleSheet } from 'react-native'
import { signIn, REQUEST_SIGN_IN } from '../state/actions/users'
import Page from '../layouts/Page'
import Button from '../components/Button'

type Props = {
  navigation: {
    navigate: string => void,
  },
  isLoading: boolean,
  signIn: () => {},
}

class SignIn extends Component<Props> {
  state = {
    username: '',
    password: '',
  }

  handleSubmit = async () => {
    const { username, password } = this.state
    const { signIn } = this.props

    if (!username || !password) {
      return
    }

    signIn({
      username,
      password,
      onFailure: () => {
        Alert.alert('Fail to login.', 'Check your ID and Password.')
        this.password.clear()
      },
    })
  }

  render() {
    const { username, password } = this.state
    const { isLoading } = this.props
    return (
      <Page>
        <View style={styles.container}>
          <View>
            <TextInput
              style={styles.form}
              placeholder="ID"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
              returnKeyType="next"
              enablesReturnKeyAutomatically={true}
              onChangeText={text => this.setState({ username: text })}
              onSubmitEditing={() => this.password.focus()}
              underlineColorAndroid="transparent"
            />
            <TextInput
              ref={c => (this.password = c)}
              style={styles.form}
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
              returnKeyType="go"
              onChangeText={text => this.setState({ password: text })}
              enablesReturnKeyAutomatically={true}
              onSubmitEditing={this.handleSubmit}
              underlineColorAndroid="transparent"
            />
            <Button
              title="Login"
              color="white"
              loading={isLoading}
              disabled={!username || !password}
              buttonStyle={{ marginTop: 10 }}
              onPress={this.handleSubmit}
            />
          </View>
        </View>
      </Page>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    paddingTop: 100,
    backgroundColor: '#1e3055',
  },
  form: {
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#fff',
    height: 40,
    padding: 5,
    marginTop: 3,
  },
})

export default connect(
  state => ({
    isLoading: state.users.status === REQUEST_SIGN_IN,
  }),
  dispatch => ({
    ...bindActionCreators({ signIn }, dispatch),
  }),
)(SignIn)
