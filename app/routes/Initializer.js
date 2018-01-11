import { TabNavigator, StackNavigator } from 'react-navigation'
import Splash from '../screens/Splash'

const navigationOptions = {
  headerStyle: {
    backgroundColor: '#1e3055',
  },
  headerTitleStyle: {
    color: '#f1f1f1',
  },
}

export default TabNavigator(
  {
    Home: {
      screen: StackNavigator(
        {
          Splash: { screen: Splash },
        },
        { navigationOptions },
      ),
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
    },
  },
)
