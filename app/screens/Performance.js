import React, { Component } from 'react'
import { Button, StyleSheet, View, Alert } from 'react-native'
import { NavigationScreenProp } from 'react-navigation/lib/TypeDefinition'
import Page from '../layouts/Page'
import PerformanceForm from '../components/posts/PerformanceForm'

type Props = {
  navigation: NavigationScreenProp,
  onDone: () => void,
}

class Performance extends Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    headerLeft: (
      <View style={styles.headerLeft}>
        <Button title="Cancel" onPress={() => navigation.goBack()} />
      </View>
    ),
    headerRight: (
      <View style={styles.headerRight}>
        <Button title="Done" onPress={() => navigation.state.params.handleDone()} />
      </View>
    ),
  })

  constructor(props) {
    super(props)
    this.state = {
      ...props.navigation.state.params.item,
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({ handleDone: this.handleDone })
  }

  handleChange = (field, value) => this.setState({ [field]: value })

  handleDone = () => {
    const { navigation } = this.props
    const { onDone, index } = navigation.state.params

    // Validations
    const { event, value } = this.state
    if (!event) {
      Alert.alert('Check your form.', 'Check event field.')
      return
    }
    if (!value) {
      Alert.alert('Check your form.', 'Check value field.')
      return
    }

    onDone(index, this.state)
    navigation.goBack()
  }

  render() {
    const { events } = this.props.navigation.state.params
    return (
      <Page>
        <View style={styles.container}>
          <View>
            <PerformanceForm item={this.state} events={events} onChange={this.handleChange} />
          </View>
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

export default Performance
