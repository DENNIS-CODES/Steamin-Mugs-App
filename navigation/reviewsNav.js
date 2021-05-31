import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import MyReviews from '../screens/ReviewsScreen'
import Review from '../components/reviewform'

const Stack = createStackNavigator()

class MyReviewsNav extends Component {
  render () {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Reviews' component={MyReviews} />
        <Stack.Screen name='Edit Review' component={Review} />
      </Stack.Navigator>
    )
  }
}

export default MyReviewsNav