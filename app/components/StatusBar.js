import React from 'react'
import { Platform, View, StyleSheet } from 'react-native'

export default () => <View style={styles.statusBar} />

const styles = StyleSheet.create({
  statusBar: {
    height: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#1e3055',
  },
})
