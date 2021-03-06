import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { View, Button, FlatList, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native'
import { NavigationScreenProp } from 'react-navigation/lib/TypeDefinition'
import { formatDate } from '../lib/date'
import { fetchPosts, REQUEST_FETCH_POSTS } from '../state/actions/posts'
import Page from '../layouts/Page'
import PostItem from '../components/posts/PostItem'

type Props = {
  items: [],
  isLoading: boolean,
  fetchPosts: () => void,
  navigation: NavigationScreenProp,
}

class Posts extends Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    title: 'Posts',
    headerRight:
      navigation.state.params && navigation.state.params.handleAdd ? (
        <View style={styles.headerRight}>
          <Button title="Add" onPress={() => navigation.state.params.handleAdd()} />
        </View>
      ) : null,
  })

  state = {
    refreshing: false,
  }

  componentDidMount() {
    const { navigation } = this.props
    this.props.fetchPosts({
      onSuccess: () => {
        navigation.setParams({ handleAdd: this.handleAdd })
      },
    })
  }

  handleAdd = () => {
    this.props.navigation.navigate('Post', {
      id: null,
      title: 'New Post',
    })
  }

  handlePress = item => {
    this.props.navigation.navigate('Post', {
      id: item.id,
      title: formatDate(item.workoutDate),
    })
  }

  handleRefresh = () => {
    this.setState({ refreshing: true })
    this.props.fetchPosts({
      onSuccess: () => {
        this.setState({ refreshing: false })
      },
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
              <PostItem item={item} onPress={() => this.handlePress(item)} />
            )}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl refreshing={this.state.refreshing} onRefresh={this.handleRefresh} />
            }
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
    items: state.posts.items,
    isLoading: state.posts.status === REQUEST_FETCH_POSTS,
  }),
  dispatch => ({
    ...bindActionCreators({ fetchPosts }, dispatch),
  }),
)(Posts)
