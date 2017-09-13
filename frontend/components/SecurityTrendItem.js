import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Dimensions} from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';
const viewportWidth = Dimensions.get('window').width;
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
    const trend = this.props.trend;
    console.log(trend)
    return (
      <Card style={{ flex: 0 }}>
        <CardItem>
          <Left>
            <Thumbnail source={{ uri: trend.trends_type.img_url }} />
            <Body>
              <Text>{trend.title}</Text>
              <Text note>April 15, 2016</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
            <Image source={{ uri: trend.img_url }} style={{ flex: 1, height: 200, width: viewportWidth-50}} />
            <Text>
              {trend.short_description}
            </Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent textStyle={{ color: '#87838B' }}>
              <Icon name="logo-github" />
              <Text>浏览数:1203</Text>
            </Button>
          </Left>
          <Right>
            <Button small primary>
              <Text>点击阅读</Text>
            </Button>
          </Right>
        </CardItem>
      </Card>
    );
  }
}
SecurityTrendItem.propTypes = {
  trend: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};
SecurityTrendItem.defaultProps = {
  trend: {
    title: '',
  },
};

export default SecurityTrendItem;
