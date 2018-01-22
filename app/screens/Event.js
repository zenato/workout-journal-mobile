import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from 'react-native'
import { NavigationScreenProp } from 'react-navigation/lib/TypeDefinition'
import {
  clearEvent,
  deleteEvent,
  fetchEvent,
  insertEvent,
  updateEvent,
  REQUEST_DELETE_EVENT,
  REQUEST_FETCH_EVENT,
  REQUEST_INSERT_EVENT,
  REQUEST_UPDATE_EVENT,
} from '../state/actions/events'
import Page from '../layouts/Page'
import EventForm from '../components/events/EventForm'

type Props = {
  navigation: NavigationScreenProp,
  isLoading: boolean,
  fetchEvent: () => void,
  clearEvent: () => void,
  updateEvent: () => void,
  insertEvent: () => void,
  deleteEvent: () => void,
  item: {
    id: ?string,
  },
}

class Event extends Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    headerLeft: (
      <View style={styles.headerLeft}>
        <Button title="Cancel" onPress={() => navigation.goBack()} />
      </View>
    ),
    headerRight: (
      <View style={styles.headerRight}>
        {navigation.state.params.handleDone && (
          <Button title="Done" onPress={navigation.state.params.handleDone} />
        )}
      </View>
    ),
  })

  state = {
    name: null,
    value: null,
    unit: null,
    remark: null,
  }

  async componentDidMount() {
    const { navigation, fetchEvent } = this.props
    fetchEvent({
      id: navigation.state.params.id,
      onSuccess: item => {
        navigation.setParams({ handleDone: this.handleDone })
        this.setState(item)
      },
      onFailure: () => {
        this.showError()
        navigation.goBack()
      },
    })
  }

  componentWillUnmount() {
    this.props.clearEvent()
  }

  handleDone = () => {
    const { item, updateEvent, insertEvent, isLoading, navigation } = this.props
    if (isLoading) return

    // TODO: Validation.

    const params = {
      values: this.state,
      onSuccess: () => navigation.goBack(),
      onFailure: () => this.showError(),
    }
    item.id ? updateEvent(params) : insertEvent(params)
  }

  handleDelete = () => {
    const { item, deleteEvent, isLoading, navigation } = this.props
    if (isLoading) return

    const onPress = () =>
      deleteEvent({
        id: item.id,
        onSuccess: () => navigation.goBack(),
        onFailure: () => this.showError(),
      })

    Alert.alert(
      'Delete event',
      'Are you sure?',
      [{ text: 'Cancel', style: 'cancel' }, { text: 'OK', onPress }],
      { cancelable: true },
    )
  }

  showError = () => {
    Alert.alert('Error', 'Oops, An expected error seems to have occurred.')
  }

  handleChange = (fieldName, text) => this.setState({ [fieldName]: text })

  render() {
    const { isLoading, item } = this.props
    return (
      <Page>
        <View style={styles.container}>
          {!item &&
            isLoading && (
              <View style={styles.loading}>
                <ActivityIndicator animating={true} />
              </View>
            )}

          {item &&
            isLoading && (
              <View>
                <Text>Now loading...</Text>
              </View>
            )}

          {item && <EventForm item={item} isLoading={isLoading} onChange={this.handleChange} />}

          {item &&
            item.id && (
              <View>
                <Button title="Delete" onPress={this.handleDelete} />
              </View>
            )}
        </View>
      </Page>
    )
  }
}

const styles = StyleSheet.create({
  headerLeft: {
    padding: 10,
  },
  headerRight: {
    padding: 10,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default connect(
  state => ({
    isLoading: [
      REQUEST_FETCH_EVENT,
      REQUEST_UPDATE_EVENT,
      REQUEST_INSERT_EVENT,
      REQUEST_DELETE_EVENT,
    ].includes(state.events.status),
    item: state.events.item,
  }),
  dispatch => ({
    ...bindActionCreators(
      { fetchEvent, clearEvent, updateEvent, insertEvent, deleteEvent },
      dispatch,
    ),
  }),
)(Event)
