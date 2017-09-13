// import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListView, View} from 'react-native';
import { securityTrendsFetch } from '../actions';
import SecurityTrendItem from './SecurityTrendItem';
import ProgressBar from './common/ProgressBar';

class SecurityTrendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
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
  createDataSource({ securityTrends }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.dataSource = ds.cloneWithRows(securityTrends);
  }

  render() {
    return (
      this.state.isLoading ? <View><ProgressBar /></View> : <ListView
        dataSource={this.dataSource}
        enableEmptySections
        renderRow={rowData => <SecurityTrendItem trend={rowData} />}
      />
    );
  }
}
SecurityTrendsList.propTypes = {
  securityTrendsFetch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ securityTrends: state.securityTrends });

export default connect(mapStateToProps, { securityTrendsFetch })(SecurityTrendsList);
