import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Account from '../screens/profileScreen'

const Stack = createStackNavigator()

class AccountNav extends Component {
  render () {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Account' component={Account} />
      </Stack.Navigator>
    )
  }
}

export default AccountNav