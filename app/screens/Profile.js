import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Text, Alert, View, Button, StyleSheet } from 'react-native'
import { NavigationScreenProp } from 'react-navigation/lib/TypeDefinition'
import { signOut } from '../state/actions/users'
import Page from '../layouts/Page'

type Props = {
  navigation: NavigationScreenProp,
  loggedInfo: any,
  signOut: () => void,
}

class Profile extends Component<Props> {
  static navigationOptions = () => ({
    title: 'Events',
  })

  handleLogout = () => {
    Alert.alert(
      'Sign out',
      'Are you sure?',
      [{ text: 'OK', onPress: this.props.signOut }, { text: 'Cancel' }],
      { cancelable: false },
    )
  }

  render() {
    const { loggedInfo } = this.props
    return (
      <Page>
        <View style={styles.container}>
          <View style={styles.contents}>
            <Text style={styles.loggedInfo}>Logged in {loggedInfo.username}</Text>
          </View>
          <Button title="Sign Out" onPress={this.handleLogout} style={styles.signOutButton} />
        </View>
      </Page>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
  },
  contents: {
    flex: 1,
  },
  loggedInfo: {
    fontSize: 15,
  },
  signOutButton: {
    alignSelf: 'flex-end',
  },
})

export default connect(
  state => ({
    loggedInfo: state.users.loggedInfo,
  }),
  dispatch => ({
    ...bindActionCreators({ signOut }, dispatch),
  }),
)(Profile)
