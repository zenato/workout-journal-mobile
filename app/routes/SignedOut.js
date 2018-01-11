import { StackNavigator } from 'react-navigation'
import SignIn from '../screens/SignIn'

export default StackNavigator(
  {
    // SignUp: {
    //   screen: SignUp,
    //   navigationOptions: {
    //     title: 'Sign Up',
    //   },
    // },
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        title: 'Sign In',
      },
    },
  },
  {
    headerMode: 'none',
  },
)
