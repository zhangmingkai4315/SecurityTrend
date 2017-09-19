import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button } from 'native-base';

const styles = StyleSheet.create({
  userImage: {
    height: 75,
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  userContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  infoView: {
    paddingTop: 20,
  },
  buttonText: {
    color: 'white',
  },

});

class AboutMe extends Component {
  constructor(props) {
    super(props);
    this.renderUserInformation = this.renderUserInformation.bind(this);
  }
  renderUserInformation() {
    if (this.props.user) {
      return <Text> 用户信息 </Text>;
    }
    return (<Button primary onPress={Actions.login}>
      <Text style={styles.buttonText}> 点击登入 </Text>
    </Button>);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <Image source={ require('../images/user.png') } style={styles.userImage} />
        </View>
        <View style={styles.userInfoContainer}>
          <View style={styles.infoView}>
            {this.renderUserInformation()}
          </View>
        </View>      
      </View>)
  }
}

AboutMe.defaultProps = {
  user: null,
};

const mapStateToProps = (state) => {
  const { user } = state.auth;
  return {
    user,
  };
};


export default connect(mapStateToProps, null)(AboutMe);


