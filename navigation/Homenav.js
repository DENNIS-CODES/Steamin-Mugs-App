import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/homeScreen'
import Search from '../components/searchform'
import Shop from '../components/shopview'
import NewReview from '../components/reviewform'
import Review from '../components/reviewcard'
import Camera from '../components/cameraview'
import Login from '../screens/LoginScreen'
import SignUp from '../screens/SignupScreen'

const Stack = createStackNavigator()

class HomeNav extends Component {
  render () {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Search' component={Search} />
        <Stack.Screen name='Shop' component={Shop} />
        <Stack.Screen name='ReviewForm' component={NewReview} />
        <Stack.Screen name='Review' component={Review} />
        <Stack.Screen name='Camera' component={Camera} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Sign Up' component={SignUp} />
      </Stack.Navigator>
    )
  }
}
export default HomeNav