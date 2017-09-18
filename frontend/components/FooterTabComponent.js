import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import { FooterTab, Footer, Button, Icon } from 'native-base';
import { switchTabNumber } from '../actions';

class FooterTabComponent extends Component {
  constructor(props) {
    super(props);
    this.renderButton = this.renderButton.bind(this);
    // this.tabSelectedButtonPress = this.tabSelectedButtonPress.bind(this);
  }
  tabSelectedButtonPress(i, key) {
    // Actions[key]();
    console.log(arguments)
    Actions[key]();
    this.props.switchTabNumber(i);
    // Change the router for each tab
  }
  renderButton() {
    const buttons = [{
      name: '新闻列表', icon: 'apps', key: 'securityTrendsList',
    }, {
        name: '选择兴趣', icon: 'navigate', key: 'securityTrendsList',
    }, {
      name: '关于我', icon: 'person', key: 'aboutme',
    }];
    return buttons.map((v, i) => {
      if (this.props.tabSelected === i) {
        return (
          <Button vertical active key={v.icon} onPress={this.tabSelectedButtonPress.bind(this,i,v.key)}>
            <Icon active name={v.icon} />
            <Text>{v.name}</Text>
          </Button>
        );
      }
      return (
        <Button vertical key={v.icon} onPress={this.tabSelectedButtonPress.bind(this, i, v.key)}>
          <Icon name={v.icon} />
          <Text>{v.name}</Text>
        </Button>
      );
    },
    );
  }
  render() {
    return (
      <View>
        <Footer>
          <FooterTab>
            {this.renderButton()}
          </FooterTab>
        </Footer>
      </View>
    );
  }
}
FooterTabComponent.propTypes = {
  tabSelected: PropTypes.number,
  switchTabNumber: PropTypes.func.isRequired,
};
FooterTabComponent.defaultProps = {
  tabSelected: 0,
};
const mapStateToProps = ({ setting }) => ({
  tabSelected: setting.tabSelected,
});

export default connect(mapStateToProps, { switchTabNumber })(FooterTabComponent);
