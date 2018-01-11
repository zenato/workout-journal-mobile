import React, { Component } from 'react'
import { StyleSheet, TextInput, View, Text, TouchableOpacity, DatePickerIOS } from 'react-native'
import _ from 'lodash'
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
  constructor(props) {
    super(props)

    this.state = {
      isWorkoutDateOpen: false,
      workoutDate: _.get(props.item, 'workoutDate', new Date()),
    }
  }

  handlePressWorkoutDate = () => {
    this.setState(state => ({ isWorkoutDateOpen: !state.isWorkoutDateOpen }))
  }

  handleWorkoutDateChange = workoutDate => {
    this.setState({ workoutDate })
    this.props.onChange('workoutDate', workoutDate)
  }

  render() {
    const { isLoading, item, onChange } = this.props
    const { isWorkoutDateOpen, workoutDate } = this.state
    return (
      <View>
        <Field label="Date">
          <TouchableOpacity onPress={this.handlePressWorkoutDate}>
            <Text style={[styles.workoutDateText, isWorkoutDateOpen && styles.workoutDateActive]}>
              {format(workoutDate, 'MM/DD/YYYY')}
            </Text>
          </TouchableOpacity>
        </Field>
        {isWorkoutDateOpen && (
          <DatePickerIOS
            mode="date"
            date={workoutDate}
            onDateChange={this.handleWorkoutDateChange}
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
