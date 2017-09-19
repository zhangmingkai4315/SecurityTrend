import React, { Component } from 'react'
import {
  View,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Text,
} from 'react-native';

// import {
//   Button
// } from 'native-base';

import * as Actions from '../../actions';
import StyleVars from '../../styles/StyleVars';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: StyleVars.Color.primary,
    flex: 1,
  },
  scrollView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: StyleVars.Color.primary,
    overflow: 'visible',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth,
    height: windowHeight,
    backgroundColor: StyleVars.Color.primary,
  },
  logoImage: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.25,
  },
  titleText: {
    color: 'white',
    fontSize: 30,
    marginTop: 8,
    fontWeight: '600',
    fontFamily: StyleVars.Fonts.logo,
    marginBottom: 15,
  },
  horizontailLine: {
    flex: 1,
    height: 1,
    marginTop: 2,
    marginHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 48,
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.5)',
  },
  footerText: {
    color: 'white',
    fontFamily: StyleVars.Fonts.gerneral,
    fontSize: 14,

  },
  inputContainer: {
    width: windowWidth * 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomColor: 'rgba(255,255,255,0.75)',
    borderBottomWidth: 1,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: StyleVars.Color.primary,
    color: 'white',
    fontFamily: StyleVars.Fonts.gerneral,
    fontSize: 16,
    padding: 5,
  },
  footActionText: {
    fontWeight: '800',
  },
  loginButtonContainer: {
    marginTop: 5,
    width: windowWidth * 0.8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    width: windowWidth * 0.8,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,.5)',
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { isSignup: false };
    this.email = null;
    this.password = null;
    this.passwordConfirm = null;
  }
  componentDidMount() {
    // Reflux.listenTo(Actions.loadUser.completed, 'onLoadUserCompleted')
  }
  changeSignUp() {
    this.setState({ isSignup: !this.state.isSignup });
  }
  submitForm() {
    console.log(this.email, this.password, this.passwordConfirm);
    if (this.state.isSignup) {
      if (!this.email || !this.password || !this.passwordConfirm) {
        return console.error('Missing Input Fields');
      }
      if (this.password != this.passwordConfirm) {
        return console.error('Confirm password is wrong');
      }
      console.log(this.state);
    }
  }
  renderForm() {
    const passwordConfirmField = this.state.isSignup ? (
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='确认密码'
            ref={(ref) => this._passwordConfirmRef = ref}
            placeholderTextColor='rgba(255,255,255,0.75)'
            selectionColor='white'
            style={styles.input}
            autoCapitalize='none'
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={(password) => this.passwordConfirm = password}
            returnKeyType='go'
            onSubmitEditing={() => this.submitForm()} />
        </View>
      </View>
    ) : null;
    return (
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Email'
            placeholderTextColor='rgba(255,255,255,0.75)'
            keyboardType='email-address'
            selectionColor='white'
            style={styles.input}
            autoFocus={true}
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(email) => this.email = email}
            returnKeyType='next'
            onSubmitEditing={() => this._passwordRef.focus()} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            ref={(ref) => this._passwordRef = ref}
            placeholder='Password'
            placeholderTextColor='rgba(255,255,255,0.75)'
            secureTextEntry={true}
            selectionColor='white'
            style={styles.input}
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(password) => this.password = password}
            returnKeyType={this.state.isSignup ? 'next' : 'go'}
            onSubmitEditing={() => this.state.isSignup ? this._passwordConfirmRef.focus() : this.submitForm()} />
        </View>
        {passwordConfirmField}
        <View style={styles.loginButtonContainer}>
          <Button
            onPress={() => this.submitForm()}
            textStyle={{ fontSize: 18, fontWeight: '600' }}
            style={styles.loginButton}
            title={this.state.isSignup ? 'Sign Up' : 'Login'}
          />
        </View>
      </View>
    );
  }

  render() {
    let footerText = this.state.isSignup ? (
      <Text style={styles.footerText}>
        已经注册？<Text style={styles.footActionText}>登入系统</Text>
      </Text>
    ) : (
        <Text style={styles.footerText}>
          申请账号？<Text style={styles.footActionText}>点击注册</Text>
        </Text>
      )
    return (
      <View style={styles.container}>
        <ScrollView
          ref='scrollView'
          keyboardShouldPersistTaps={'never'}
          automaticallyAdjustContentInsets={true}
          alwaysBounceVertical={false}
          style={styles.scrollView}>

          <View style={styles.innerContainer}>
            <Image source={require('../../images/logo-normal.png')} style={styles.logoImage} />
            <Text style={styles.socailText}> Social </Text>
            {this.renderForm()}
          </View>
          <View style={styles.horizontailLine} />
          <TouchableOpacity style={styles.footer} activeOpacity={0.8} onPress={() => this.changeSignUp()}>
            {footerText}
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default Login;