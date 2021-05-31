import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import NearestShops from '../screens/CoffeeShop'
import Shop from '../components/shop-view'

const Stack = createStackNavigator() //navigates in stack format first in first out order

class FavouritesNav extends Component {
  render () {
    return (//returns coffee shops and shops
      <Stack.Navigator>
        <Stack.Screen name='Nearest Shops' component={NearestShops} /> //Nearest shops closer to user
        <Stack.Screen name='Shop' component={Shop} /> //coffee shops
      </Stack.Navigator>
    )
  }
}

export default FavouritesNav