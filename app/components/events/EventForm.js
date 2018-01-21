import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import Field from '../form/Field'

type Props = {
  item: {
    id: ?string,
  },
  isLoading: boolean,
  onChange: () => void,
  onDelete: () => void,
}

export default ({ isLoading, item, onChange }: Props) => (
  <View>
    <Field label="Name">
      <TextInput
        placeholder="Event name"
        editable={!isLoading}
        returnKeyType="next"
        defaultValue={item.name}
        onChangeText={text => onChange('name', text)}
        underlineColorAndroid="transparent"
        style={styles.inputText}
      />
    </Field>
    <Field label="Value">
      <TextInput
        placeholder="Value"
        editable={!isLoading}
        keyboardType="numeric"
        returnKeyType="next"
        defaultValue={item.value.toString()}
        onChangeText={text => onChange('value', text)}
        underlineColorAndroid="transparent"
        style={styles.inputText}
      />
    </Field>
    <Field label="Unit">
      <TextInput
        placeholder="Unit"
        editable={!isLoading}
        returnKeyType="next"
        defaultValue={item.unit}
        onChangeText={text => onChange('unit', text)}
        underlineColorAndroid="transparent"
        style={styles.inputText}
      />
    </Field>
    <Field label="Remark">
      <TextInput
        placeholder="Remark"
        editable={!isLoading}
        returnKeyType="next"
        defaultValue={item.remark}
        onChangeText={text => onChange('remark', text)}
        underlineColorAndroid="transparent"
        style={styles.inputText}
      />
    </Field>
  </View>
)

const styles = StyleSheet.create({
  inputText: {},
})
