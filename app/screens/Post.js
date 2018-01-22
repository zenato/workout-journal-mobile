import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import { NavigationScreenProp } from 'react-navigation/lib/TypeDefinition'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  clearPost,
  deletePost,
  fetchPostWithEvents,
  insertPost,
  updatePost,
  REQUEST_FETCH_POST_WITH_EVENTS,
  REQUEST_DELETE_POST,
  REQUEST_INSERT_POST,
  REQUEST_UPDATE_POST,
} from '../state/actions/posts'
import Page from '../layouts/Page'
import PostForm from '../components/posts/PostForm'

type Props = {
  navigation: NavigationScreenProp,
  isLoading: boolean,
  fetchPostWithEvents: () => void,
  clearPost: () => void,
  updatePost: () => void,
  insertPost: () => void,
  deletePost: () => void,
  item: {
    id: ?string,
  },
  events: ?Array,
}

type PerformanceProps = {
  events: ?Array,
  performance: ?Array,
  onEdit: () => {},
  onDelete: () => {},
}

class Post extends Component<Props> {
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
    workoutDate: null,
    remark: null,
    performances: [],
  }

  async componentDidMount() {
    const { navigation, fetchPostWithEvents } = this.props
    fetchPostWithEvents({
      id: navigation.state.params.id,
      onSuccess: ({ post }) => {
        navigation.setParams({ handleDone: this.handleDone })
        this.setState(post.item)
      },
      onFailure: () => {
        this.showError()
        navigation.goBack()
      },
    })
  }

  componentWillUnmount() {
    this.props.clearPost()
  }

  handleChange = (field, value) => this.setState({ [field]: value })

  handleDone = () => {
    const { item, updatePost, insertPost, isLoading, navigation } = this.props
    if (isLoading) return

    // Validations
    const { workoutDate } = this.state
    if (!workoutDate) {
      Alert.alert('Check your form.', 'Check workoutDate field.')
      return
    }

    const params = {
      values: this.state,
      onSuccess: () => navigation.goBack(),
      onFailure: () => this.showError(),
    }
    item.id ? updatePost(params) : insertPost(params)
  }

  handleDelete = () => {
    const { item, deletePost, isLoading, navigation } = this.props
    if (isLoading) return

    const onPress = () =>
      deletePost({
        id: item.id,
        onSuccess: () => navigation.goBack(),
        onFailure: () => this.showError(),
      })

    Alert.alert(
      'Delete post',
      'Are you sure?',
      [{ text: 'Cancel', style: 'cancel' }, { text: 'OK', onPress }],
      { cancelable: true },
    )
  }

  showError = () => {
    Alert.alert('Error', 'Oops, An expected error seems to have occurred.')
  }

  handleEditPerformance = (index = -1) => {
    const { navigation, events } = this.props
    const { performances } = this.state
    navigation.navigate('Performance', {
      title: `${index < 0 ? 'New' : 'Edit'} Performance`,
      item: performances[index] || {},
      events,
      index,
      onDone: this.handleDonePerformance,
    })
  }

  handleDonePerformance = (index, performance) => {
    this.setState(state => ({
      performances:
        index < 0
          ? [...state.performances, performance]
          : state.performances.map((e, i) => (i === index ? performance : e)),
    }))
  }

  handleDeletePerformance = index => {
    this.setState(state => ({
      performances: state.performances.filter((p, i) => i !== index),
    }))
  }

  render() {
    const { isLoading, item, events } = this.props
    const { performances } = this.state
    return (
      <Page>
        <View style={styles.container}>
          {!item && (
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

          {item && (
            <View>
              <PostForm item={item} isLoading={isLoading} onChange={this.handleChange} />
              <View style={styles.performanceAddButton}>
                <Button title="Add Performance" onPress={() => this.handleEditPerformance()} />
              </View>
            </View>
          )}

          <View style={styles.performances}>
            {performances.map((performance, index) => (
              <Performance
                key={index}
                events={events}
                performance={performance}
                onEdit={() => this.handleEditPerformance(index)}
                onDelete={() => this.handleDeletePerformance(index)}
              />
            ))}
          </View>

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

const Performance = ({ events, performance, onEdit, onDelete }: PerformanceProps) => {
  const event = events.find(e => e.id === performance.event.id)
  const styles = performanceStyles
  return (
    <View style={styles.container}>
      <View style={styles.event}>
        <Text style={styles.eventName}>{event.name}</Text>
        <Text style={styles.eventUnit}>
          ({performance.value} {event.unit})
        </Text>
      </View>
      <View style={styles.sets}>
        <Text>{performance.set1 || 0}</Text>
        <Text> / {performance.set2 || 0}</Text>
        <Text> / {performance.set3 || 0}</Text>
        <Text> / {performance.set4 || 0}</Text>
        <Text> / {performance.set5 || 0}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={onEdit}>
          <Icon name="ios-add-circle" size={20} style={styles.editButton} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Icon name="ios-remove-circle" size={20} style={styles.deleteButton} />
        </TouchableOpacity>
      </View>
    </View>
  )
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
  performances: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'column',
  },
  performanceAddButton: {
    marginTop: 10,
  },
})

const performanceStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
  },
  event: {
    flex: 1,
    flexDirection: 'row',
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventUnit: {
    marginLeft: 5,
    fontSize: 13,
    color: '#aaaaaa',
  },
  sets: {
    flex: 1,
    flexDirection: 'row',
  },
  buttons: {
    flexDirection: 'row',
  },
  editButton: {
    color: '#436cff',
  },
  deleteButton: {
    color: 'red',
    marginLeft: 10,
  },
})

export default connect(
  state => ({
    isLoading: [
      REQUEST_FETCH_POST_WITH_EVENTS,
      REQUEST_UPDATE_POST,
      REQUEST_INSERT_POST,
      REQUEST_DELETE_POST,
    ].includes(state.posts.status),
    events: state.posts.events,
    item: state.posts.item,
  }),
  dispatch => ({
    ...bindActionCreators(
      { fetchPostWithEvents, clearPost, updatePost, insertPost, deletePost },
      dispatch,
    ),
  }),
)(Post)
