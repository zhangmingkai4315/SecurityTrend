import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import {
  Image,
  StyleSheet,
  Dimensions } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';
const viewportWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  thumbnail: {
    borderRadius: 2,
    borderWidth: 0.6,
    borderColor: '#d6d7da',
  },
  title: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'Roboto',
  },
  shortDescription: {
    fontSize:13,
    marginTop:10,
    color:'black',
    fontFamily:'Helvetica-Light'
  }
});




class SecurityTrendItem extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onRowPress.bind(this);
  }
  onRowPress() {
    console.log(this.props)
    Actions.securityTrendDetail({ trend: this.props.trend });
  }
  render() {
    const trend = this.props.trend;
    const logoImg = (trend.trends_type && trend.trends_type.img_url) || '';
    return (
      <Card style={{ flex: 0 }}>
        <CardItem>
          <Left>
            <Thumbnail style={styles.thumbnail} source={{ uri: logoImg }} />
            <Body>
              <Text style={styles.title}>{trend.title}</Text>
              <Text note>{moment(trend.createdAt).fromNow()||''}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
            <Image source={{ uri: trend.img_url || '' }} style={{ flex: 1, height: 200, width: viewportWidth-50}} />
            <Text style={styles.shortDescription}>
              {trend.short_description}
            </Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent textStyle={{ color: '#87838B' }}>
              <Icon name="eye" />
              <Text> 访问数量:1203</Text>
            </Button>
          </Left>
          <Right>
            <Button transparent info onPress={this.onPress}>
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
