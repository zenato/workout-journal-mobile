import React, { Component } from 'react'
import { StyleSheet, TextInput, View, Picker } from 'react-native'
import _ from 'lodash'
import Field from '../form/Field'

type Props = {
  item: ?any,
  events: Array,
  onChange: () => {},
}

export default class PerformanceForm extends Component<Props> {
  handleChangeEvent = id => {
    const { item, events, onChange } = this.props
    const event = events.find(e => e.id === id)
    if (id && !item.value) {
      onChange('value', event.value)
    }
    onChange('event', { id })
  }

  render() {
    const { item, events, onChange } = this.props
    return (
      <View>
        <Field label="Event">
          <Picker selectedValue={_.get(item.event, 'id')} onValueChange={this.handleChangeEvent}>
            <Picker.Item key={0} label={'Select event'} value={null} />
            {events.map(e => <Picker.Item key={e.id} label={e.name} value={e.id} />)}
          </Picker>
        </Field>
        <Field label="Value">
          <TextInput
            placeholder="Value"
            keyboardType="numeric"
            returnKeyType="next"
            value={`${item.value || ''}`}
            onChangeText={text => onChange('value', Number(text))}
            style={styles.inputText}
          />
        </Field>
        <Field label="Set 1">
          <TextInput
            placeholder="Set 1"
            keyboardType="numeric"
            returnKeyType="next"
            value={`${item.set1 || ''}`}
            onChangeText={text => onChange('set1', Number(text))}
            style={styles.inputText}
          />
        </Field>
        <Field label="Set 2">
          <TextInput
            placeholder="Set 2"
            keyboardType="numeric"
            returnKeyType="next"
            value={`${item.set2 || ''}`}
            onChangeText={text => onChange('set2', Number(text))}
            style={styles.inputText}
          />
        </Field>
        <Field label="Set 3">
          <TextInput
            placeholder="Set 3"
            keyboardType="numeric"
            returnKeyType="next"
            value={`${item.set3 || ''}`}
            onChangeText={text => onChange('set3', Number(text))}
            style={styles.inputText}
          />
        </Field>
        <Field label="Set 4">
          <TextInput
            placeholder="Set 4"
            keyboardType="numeric"
            returnKeyType="next"
            value={`${item.set4 || ''}`}
            onChangeText={text => onChange('set4', Number(text))}
            style={styles.inputText}
          />
        </Field>
        <Field label="Set 5">
          <TextInput
            placeholder="Set 5"
            keyboardType="numeric"
            returnKeyType="next"
            value={`${item.set5 || ''}`}
            onChangeText={text => onChange('set5', Number(text))}
            style={styles.inputText}
          />
        </Field>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputText: {
    flex: 1,
  },
})
