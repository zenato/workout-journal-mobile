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
    alignSelf: 'center',
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

type TabBarIconProps = {
  tintColor: ?string,
  focused: ?boolean,
}

export default TabNavigator(
  {
    Posts: {
      screen: PostNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }: TabBarIconProps) => (
          <Icon name="ios-clipboard-outline" size={26} style={{ color: tintColor }} />
        ),
      },
    },
    Events: {
      screen: EventNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }: TabBarIconProps) => (
          <Icon name="ios-bicycle" size={26} style={{ color: tintColor }} />
        ),
      },
    },
    Profile: {
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }: TabBarIconProps) => (
          <Icon name="ios-person" size={26} style={{ color: tintColor }} />
        ),
      },
    },
  },
  {
    lazy: true,
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
    },
  },
)
