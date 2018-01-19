import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { View, Button, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import { NavigationScreenProp } from 'react-navigation/lib/TypeDefinition'
import { fetchEvents, REQUEST_FETCH_EVENTS } from '../state/actions/events'
import Page from '../layouts/Page'
import EventItem from '../components/events/EventItem'

type Props = {
  items: [],
  isLoading: boolean,
  fetchEvents: () => void,
  navigation: NavigationScreenProp,
}

class Events extends Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    title: 'Events',
    headerRight:
      navigation.state.params && navigation.state.params.handleAdd ? (
        <View style={styles.headerRight}>
          <Button title="Add" onPress={() => navigation.state.params.handleAdd()} />
        </View>
      ) : null,
  })

  componentDidMount() {
    const { navigation } = this.props
    this.props.fetchEvents({
      onSuccess: () => {
        navigation.setParams({ handleAdd: this.handleAdd })
      },
    })
  }

  handleAdd = () => {
    this.props.navigation.navigate('Event', {
      id: null,
      title: 'New Event',
    })
  }

  handlePress = item => {
    this.props.navigation.navigate('Event', {
      id: item.id,
      title: item.name,
    })
  }

  render() {
    const { items, isLoading } = this.props
    return (
      <Page>
        <View style={styles.container}>
          {!items &&
            isLoading && (
              <View style={styles.loading}>
                <ActivityIndicator animating={true} />
              </View>
            )}

          <FlatList
            data={items}
            renderItem={({ item }) => (
              <EventItem item={item} onPress={() => this.handlePress(item)} />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </Page>
    )
  }
}

const styles = StyleSheet.create({
  headerRight: {
    padding: 10,
  },
  container: {
    backgroundColor: '#c5c5c5',
    paddingBottom: 1,
    height: '100%',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default connect(
  state => ({
    items: state.events.items,
    isLoading: state.events.status === REQUEST_FETCH_EVENTS,
  }),
  dispatch => ({
    ...bindActionCreators({ fetchEvents }, dispatch),
  }),
)(Events)
