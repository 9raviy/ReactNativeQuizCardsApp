import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import NewDeck from '../screens/NewDeck';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';


const BottomTab = createBottomTabNavigator();
const initialRoute = 'Home';

export default function TabNav({ navigation, route }) {

    navigation.setOptions({ headerTitle: getHeaderTitle(route) });

    return (
        <BottomTab.Navigator initialRouteName={initialRoute}>
          <BottomTab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Home',
              tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
            }}
          />
          <BottomTab.Screen
            name="NewDeck"
            component={NewDeck}
            options={{
              title: 'New Deck',
              tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
            }}
          />
        </BottomTab.Navigator>
    );
}

function getHeaderTitle(route) {
    const routeName = route.state?.routes[route.state.index]?.name ?? initialRoute;
    switch (routeName) {
        case 'Home':
            return 'Decks';
        case 'NewDeck':
            return 'Create a new Deck?';
    }
}