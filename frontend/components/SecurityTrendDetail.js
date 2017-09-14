import React, { Component } from 'react';
import moment from 'moment';
import {
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Thumbnail,
  Body,
  Left } from 'native-base';
  
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
  content: {
    fontSize: 15,
    marginTop: 10,
    color: 'black',
    lineHeight: 25,
    fontFamily: 'Helvetica-Light',
    textAlign: 'left',
  },
});

class SecurityTrendDetail extends Component {
  render() {
    const trend = this.props.trend;
    const logoImg = (trend.trends_type && trend.trends_type.img_url) || '';
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail style={styles.thumbnail} source={{ uri: logoImg }} />
                <Body>
                  <Text style={styles.title}>{trend.title}</Text>
                  <Text note>{moment(trend.createdAt).fromNow()}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{ uri: trend.img_url || '' }} 
                    style={{ flex: 1, height: 200, width: viewportWidth - 50 }} />
            </CardItem>
            <CardItem>
              <Body>
                <Text style={styles.content}>
                  {trend.content}
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
export default SecurityTrendDetail;