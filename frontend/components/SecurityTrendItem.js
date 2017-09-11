
import React, { Component, PropTypes } from 'react'
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';

class SecurityTrendItem extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onRowPress.bind(this);
  }
  onRowPress() {
    // Actions.employeeEdit({ trend: this.props.trend })
    console.log(this.props.trend);
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View>
          <Text>{this.props.trend.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
SecurityTrendItem.propTypes = {
  trend: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};
SecurityTrendItem.defaultProps = {
  trend: {
    title: '',
  },
};

export default SecurityTrendItem;
