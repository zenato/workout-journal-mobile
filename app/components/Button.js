import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'

type Props = {
  title: string,
  buttonStyle: ?StyleSheet.Styles,
  textStyle: ?StyleSheet.Styles,
  disabledStyle: ?StyleSheet.Styles,
  loadingStyle: ?StyleSheet.Styles,
  onPress: () => {},
  disabled: ?boolean,
  loading: ?boolean,
}

const Button = (props: Props) => {
  const { title, buttonStyle, textStyle, loadingStyle, disabled, loading, onPress } = props
  return (
    <TouchableOpacity
      activeOpacity={disabled || loading ? 1 : 0.8}
      onPress={() => !disabled && onPress()}
      style={[styles.button, buttonStyle]}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={[styles.text, textStyle, disabled ? styles.disabled : null]}>{title}</Text>
        <ActivityIndicator animating={loading} style={[styles.loading, loadingStyle]} />
      </View>
    </TouchableOpacity>
  )
}

Button.defaultProps = {
  disabled: false,
  loading: false,
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    backgroundColor: '#373fff',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2e35d7',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabled: {
    color: '#7b7b7b',
  },
  loading: {
    marginLeft: 5,
  },
})

export default Button
