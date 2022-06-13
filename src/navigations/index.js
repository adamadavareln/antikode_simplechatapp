import React from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../pages/Home"
import ChatRoom from '../pages/ChatRoom'
import AddChat from '../pages/AddChat'

const Stack = createNativeStackNavigator()

const screenOptions = {
    headerShown: false,
    gestureEnabled: false,
}

export default Navigator = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="ChatRoom" component={ChatRoom} />
                <Stack.Screen name="AddChat" component={AddChat} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}