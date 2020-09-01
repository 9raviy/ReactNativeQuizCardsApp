import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DeckView from '../screens/DeckDetails'
import Quiz from '../screens/Quiz'
import NewQuestion from '../screens/NewQuestion'
import { lightGreen, grey, blue } from '../utils/colors'
import TabNav from './TabNav';

const Stack = createStackNavigator();

const StackNavigatorConfig = {
    headerMode: "screen"
}

const StackConfig = {
    NewQuestion: {
        name: "NewQuestion",
        component: NewQuestion,
        options: {
            title: 'Add New Question',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: blue
            },
        },
    },
    Quiz: {
        name: "Quiz",
        component: Quiz,
        options: {
            title: 'Quiz',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: blue
            },
        },
    },
    DeckView: {
        name: "DeckDetails",
        component: DeckDetails,
        options: {
            title: 'DeckDetails',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: blue
            },
        },
    }
}

const NavHome = () => (
    <Stack.Navigator 
  initialRouteName="Root"  {...StackNavigatorConfig}>
    <Stack.Screen name="Root" component={TabNav} />
    <Stack.Screen {...StackConfig['DeckDetails']} />
    <Stack.Screen {...StackConfig['Quiz']} />
    <Stack.Screen {...StackConfig['NewQuestion']}/>
  </Stack.Navigator>
)

export default NavHome