import React, { Component } from 'react'
import { StyleSheet, TextInput, View, Text, TouchableOpacity, DatePickerIOS } from 'react-native'
import { format } from 'date-fns'
import Field from '../form/Field'

type Props = {
  item: {
    id: ?string,
    workoutDate: ?Date,
  },
  isLoading: boolean,
  onChange: () => void,
  onDelete: () => void,
}

export default class PostForm extends Component<Props> {
  state = {
    isWorkoutDateOpen: false,
  }

  handlePressWorkoutDate = () => {
    this.setState(({ isWorkoutDateOpen }) => ({ isWorkoutDateOpen: !isWorkoutDateOpen }))
  }

  render() {
    const { isLoading, item, onChange } = this.props
    const { isWorkoutDateOpen } = this.state
    return (
      <View>
        <Field label="Date">
          <TouchableOpacity onPress={this.handlePressWorkoutDate}>
            <Text style={[styles.workoutDateText, isWorkoutDateOpen && styles.workoutDateActive]}>
              {format(item.workoutDate, 'MM/DD/YYYY')}
            </Text>
          </TouchableOpacity>
        </Field>
        {isWorkoutDateOpen && (
          <DatePickerIOS
            mode="date"
            date={item.workoutDate}
            onDateChange={workoutDate => onChange('workoutDate', workoutDate)}
          />
        )}
        <Field label="Remark">
          <TextInput
            placeholder="Remark"
            editable={!isLoading}
            returnKeyType="next"
            defaultValue={item.remark}
            onChangeText={text => onChange('remark', text)}
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
  workoutDateText: {
    fontSize: 15,
  },
  workoutDateActive: {
    color: 'blue',
  },
})
