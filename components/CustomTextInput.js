'use strict'

import React, { Component } from 'react'
import {
  View,
  TextInput,
  StyleSheet
} from 'react-native'

import PropTypes from 'prop-types'

export default class CustomInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mainColor: this.props.theme === 'dark' ? '#000' : '#fff',
      onFocus: false
    }
  }

  render () {
    return (
      <View
        ref={(view) => this.view = view}
        style={[
          { 
            borderBottomColor: this.state.mainColor,
            marginBottom: this.props.marginBottom,
            borderBottomWidth: 1
          },
          this.props.width === 'auto' && { flexDirection: 'row' },
        ].concat(this.props.style)}
      >
        <TextInput
          ref={(textInput) => this.textInput = textInput}
          multiline={this.props.multiline}
          maxLength={this.props.maxLength}
          secureTextEntry={this.props.secureTextEntry}
          keyboardType={this.props.keyboardType}
          placeholder={this.props.placeholder}
          placeholderTextColor={this.props.theme === 'light' ? this.state.mainColor : undefined}
          selectionColor={this.props.focusColor}
          returnKeyType={this.props.returnKeyType}
          defaultValue={this.props.defaultValue}
          autoFocus={this.props.autoFocus}
          keyboardAppearance={this.$OS === 'ios' ? this.props.theme === 'dark' ? 'light' : 'dark' : undefined} // ios
          underlineColorAndroid={this.$OS === 'android' ? 'transparent' : undefined} // android
          style={[
            styles.customInput,
            { color: this.state.mainColor },
            this.props.width === 'auto' ? { flex: 1 } : { width: this.props.width }
          ]}
          onFocus={() => this.onFocus()}
          onChangeText={(newValue) => this.props.onChangeText(newValue)}
          onSubmitEditing={() => this.props.onSubmitEditing()}
          onBlur={() => this.view.setNativeProps({
            style: {
              borderBottomColor: this.state.mainColor
            }
          })}
        />
      </View>
    )
  }

  onFocus () {
    this.view.setNativeProps({
      style: {
        borderBottomColor: this.props.focusColor
      }
    })
  }

  focus () {
    this.textInput.focus()
  }
}

CustomInput.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  marginBottom: PropTypes.number,
  multiline: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  theme: PropTypes.oneOf(['dark', 'light']),
  focusColor: PropTypes.string,
  keyboardType: PropTypes.oneOf([
    'default',
    'numeric',
    'email-address',
    'phone-pad'
  ]),
  placeholder: PropTypes.string,
  returnKeyType: PropTypes.oneOf([
    'done',
    'go',
    'next',
    'search',
    'send'
  ]),
  defaultValue: PropTypes.string,
  autoFocus: PropTypes.bool,
  underlineColorAndroid: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func
}

CustomInput.defaultProps = {
  width: 'auto',
  marginBottom: Component.prototype.$verticalSpacingDistance,
  secureTextEntry: false,
  theme: 'dark',
  focusColor: Component.prototype.$mainColor
}

const styles = StyleSheet.create({
  customInput: {
    paddingLeft: 8,
    paddingRight: 8,
    height: 38
  }
})