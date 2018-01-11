import React from 'react'
import { View, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native'

export default (props: { children: ?React.Node }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <StatusBar
        barStyle="light-content"
        //backgroundColor='blue'
      />
      {props.children}
    </View>
  </TouchableWithoutFeedback>
)
