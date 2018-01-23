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
    item: null,
  }

  async componentDidMount() {
    const { navigation, fetchEvent } = this.props
    fetchEvent({
      id: navigation.state.params.id,
      onSuccess: item => {
        navigation.setParams({ handleDone: this.handleDone })
        this.setState({
          item: {
            name: '',
            unit: 'KG',
            value: 0,
            remark: '',
            ...item,
          },
        })
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
    const { updateEvent, insertEvent, isLoading, navigation } = this.props
    const { item } = this.state
    if (isLoading) return

    // TODO: Validation.

    const params = {
      values: item,
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

  handleChange = (fieldName, text) =>
    this.setState(({ item }) => ({
      item: {
        ...item,
        [fieldName]: text,
      },
    }))

  render() {
    const { isLoading } = this.props
    const { item } = this.state
    return (
      <Page>
        <View style={styles.container}>
          {!item &&
            isLoading && (
              <View style={styles.loading}>
                <ActivityIndicator animating={true} />
              </View>
            )}

          {item && (
            <View>
              {isLoading && (
                <View>
                  <Text>Now loading...</Text>
                </View>
              )}

              <EventForm item={item} isLoading={isLoading} onChange={this.handleChange} />

              {item.id && (
                <View style={styles.buttons}>
                  <Button title="Delete" color="#f00" onPress={this.handleDelete} />
                </View>
              )}
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
  buttons: {
    marginTop: 10,
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
