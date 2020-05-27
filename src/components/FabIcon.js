import React from 'react';
import { Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export class FabIcon extends React.Component {
  render() {
    return (
     <Ionicons name="md-call" style={styles.actionButtonIcon} />
    );
  }
}

