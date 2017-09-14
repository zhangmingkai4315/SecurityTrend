import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  // Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  progressBar: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
});

const ProgressBar = () => (
  <View style={styles.progressBar}>
    <ActivityIndicator size="large" color="#31312f" />
  </View>
);

export default ProgressBar;

