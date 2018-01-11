import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type FieldProps = {
  label: string,
  children: ?React.Node,
}

export default ({ label, children }: FieldProps) => (
  <View style={styles.field}>
    <View style={styles.label}>
      <Text style={styles.labelText}>{label}</Text>
    </View>
    <View style={[styles.childContainer]}>{React.Children.only(children)}</View>
  </View>
)

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    width: 80,
    minHeight: 50,
    justifyContent: 'center',
  },
  labelText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  childContainer: {
    flex: 1,
    flexDirection: 'column',
    minHeight: 30,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
})
