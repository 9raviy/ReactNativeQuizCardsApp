import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { orange, blue, lightGrey } from '../utils/colors';

export default function TabBarIcon(props) {
    return (
        <Ionicons
      name={props.name}
      size={30}
      style={{ marginBottom: -5 }}
      color={props.focused ? orange : lightGrey}
    />
    );
}