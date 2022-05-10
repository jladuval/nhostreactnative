import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
} from '@react-navigation/stack'
import { NhostClient, NhostReactProvider, useAuthenticationStatus } from "@nhost/react"
import { NhostApolloProvider } from '@nhost/react-apollo'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { LoginScreen } from './components/LoginScreen'
import { MainScreen } from './components/MainScreen'


const nhost = new NhostClient({
  backendUrl: 'https://mnrlighfwlusphtusdou.nhost.run',
  clientStorageType: 'react-native',
  clientStorage: AsyncStorage,
  autoSignIn: false,
  autoLogin: false
})

const Stack = createStackNavigator()

const LoginStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  )
}

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={MainScreen} />
    </Stack.Navigator>
  )
}

const AppScreens = () => {
  const {isAuthenticated } = useAuthenticationStatus()

  if (!isAuthenticated) {
    return <LoginStack />
  }

  return <MainStack />
}

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <NhostReactProvider nhost={nhost}>
        <NhostApolloProvider nhost={nhost}>
            <AppScreens />
        </NhostApolloProvider>
      </NhostReactProvider>
    </NavigationContainer>
    </SafeAreaProvider >
  )
}

export default App
