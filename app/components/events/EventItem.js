import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

type Props = {
  item: ?any,
  onPress: () => void,
}

export default ({ item, onPress }: Props) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.value}>{item.value}</Text>
        <Text style={styles.unit}>{item.unit}</Text>
      </View>
      <Text style={styles.remark}>{item.remark}</Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    height: 60,
    marginTop: 1,
    padding: 10,
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    marginLeft: 10,
    fontSize: 16,
    color: '#b1b1b1',
  },
  unit: {
    fontSize: 16,
    color: '#b1b1b1',
  },
  remark: {
    marginTop: 5,
    color: '#929292',
    fontSize: 16,
  },
})
