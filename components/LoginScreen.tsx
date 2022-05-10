import React, { useCallback } from 'react'
import { Button, SafeAreaView, Text } from 'react-native'
import { useSignInEmailPassword, useAuthenticationStatus } from '@nhost/react'

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';


const LoginScreen = () => {
  const { isLoading } = useAuthenticationStatus()

  const { signInEmailPassword, isLoading: signingIn } = useSignInEmailPassword()

  const handleLoginPress = useCallback(async () => {
    const res = await signInEmailPassword('foo@example.com', 'nhostexample')
    console.log(res)
  }, [signInEmailPassword])
  
  const bgStyles = {
    backgroundColor: Colors.darker,
    display: 'flex',
    flex: 1
  };

  let inner;
  if (isLoading) {
    inner =  (
      <Text >
        Nhost Client is determining the initial authentication status...
      </Text>
    )
  } else if (signingIn) {
    inner =  (
      <Text>
        Signing you in
      </Text>
    )
  } else {
    inner = <Button onPress={handleLoginPress} title='sign in' />
  }

  return (
    <SafeAreaView style={bgStyles}>
      {inner}
    </SafeAreaView>
    )
}

export { LoginScreen }
