import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import LikedReviews from '../screens/likedReviewsScreen'

const Stack = createStackNavigator()
//creating liked reviews nav
class LikedReviewsNav extends Component {
  render () {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Liked Reviews' component={LikedReviews} />
      </Stack.Navigator>
    )
  }
}

export default LikedReviewsNav