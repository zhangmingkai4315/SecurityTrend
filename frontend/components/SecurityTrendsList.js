// import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { securityTrendsFetch } from '../actions'
import SecurityTrendItem from './SecurityTrendItem';

class SecurityTrendsList extends Component {
  static renderRow(data) {
    return (
      <SecurityTrendItem trend={data} />
    );
  }
  componentWillMount() {
    this.props.securityTrendsFetch();
    this.createDataSource(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }
  createDataSource({ securityTrends }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.dataSource = ds.cloneWithRows(securityTrends);
  }

  render() {
    return (
      <ListView
        dataSource={this.dataSource}
        enableEmptySections
        renderRow={this.renderRow}
      />
    );
  }
}
SecurityTrendsList.propTypes = {
  securityTrendsFetch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ securityTrends: state.securityTrends });

export default connect(mapStateToProps, { securityTrendsFetch })(SecurityTrendsList);
