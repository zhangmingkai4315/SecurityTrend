// import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListView, View, ActivityIndicator, RefreshControl } from 'react-native';
import { securityTrendsFetch } from '../actions';
import SecurityTrendItem from './SecurityTrendItem';
import ProgressBar from './common/ProgressBar';

class SecurityTrendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    this.onEndReached = this.onEndReached.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }
  componentWillMount() {
    this.props.securityTrendsFetch();
    this.createDataSource(this.props);
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000);
  }
  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }
  onEndReached() {
    if (!this.props.listWaiting) {
      this.props.securityTrendsFetch();
    }
  }
  onRefresh() {
    if (!this.props.listWaiting) {
      this.props.securityTrendsFetch(true);
    }
  }
  createDataSource({ securityTrends }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.dataSource = ds.cloneWithRows(securityTrends.securityTrends);
  }
  renderFooter() {
    if (this.props.listWaiting) {
      return <ActivityIndicator size={'large'} />;
    }
    return <View />;
  }
  render() {
    return (
      this.state.isLoading ? <View><ProgressBar /></View> : <View><ListView
        dataSource={this.dataSource}
        refreshControl={
          <RefreshControl
            refreshing={this.props.listWaiting}
            onRefresh={this.onRefresh}
          />}
        enableEmptySections
        onEndReached={this.onEndReached}
        renderRow={rowData => <SecurityTrendItem trend={rowData} />}
      />{this.renderFooter()}</View>
    );
  }
}
SecurityTrendsList.propTypes = {
  securityTrendsFetch: PropTypes.func.isRequired,
  listWaiting: PropTypes.bool,
};
SecurityTrendsList.defaultProps = {
  listWaiting: false,
};

const mapStateToProps = ({ securityTrends, listWaiting, error }) => ({
  securityTrends,
  listWaiting,
  error,
});

export default connect(mapStateToProps, { securityTrendsFetch })(SecurityTrendsList);
