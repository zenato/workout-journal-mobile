import React from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import Events from '../screens/Events'
import Event from '../screens/Event'
import Posts from '../screens/Posts'
import Post from '../screens/Post'
import Performance from '../screens/Performance'
import Profile from '../screens/Profile'

const navigationOptions = {
  headerStyle: {
    backgroundColor: '#1e3055',
  },
  headerTitleStyle: {
    color: '#f1f1f1',
  },
}

const EventNavigator = StackNavigator(
  {
    Events: { screen: Events },
    Event: { screen: Event },
  },
  { navigationOptions },
)

const PostNavigator = StackNavigator(
  {
    Posts: { screen: Posts },
    Post: { screen: Post },
    Performance: { screen: Performance },
  },
  { navigationOptions },
)

const ProfileNavigator = StackNavigator(
  {
    Profile: { screen: Profile },
  },
  { navigationOptions },
)

export default TabNavigator(
  {
    Posts: {
      screen: PostNavigator,
      navigationOptions: {
        tabBarIcon: (props: { tintColor: ?string, focused: ?boolean }) => (
          <Icon name="ios-book" size={26} style={{ color: props.tintColor }} />
        ),
      },
    },
    Events: {
      screen: EventNavigator,
      navigationOptions: {
        tabBarIcon: (props: { tintColor: ?string, focused: ?boolean }) => (
          <Icon name="ios-home" size={26} style={{ color: props.tintColor }} />
        ),
      },
    },
    Profile: {
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarIcon: (props: { tintColor: ?string, focused: ?boolean }) => (
          <Icon name="ios-person" size={26} style={{ color: props.tintColor }} />
        ),
      },
    },
  },
  {
    lazy: true,
    tabBarOptions: {
      showLabel: false,
    },
  },
)
