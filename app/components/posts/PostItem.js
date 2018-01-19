import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { formatDate } from '../../lib/date'

type Props = {
  item: ?any,
  onPress: () => void,
}

export default ({ item, onPress }: Props) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.workoutDate}>{formatDate(item.workoutDate)}</Text>
      </View>
      <Text style={styles.remark}>{item.performances.map(p => p.event.name).join(' / ')}</Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    marginTop: 1,
    padding: 10,
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
  },
  workoutDate: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  remark: {
    marginTop: 5,
    color: '#929292',
    fontSize: 16,
  },
})
