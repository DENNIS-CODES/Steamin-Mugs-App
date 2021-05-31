import React, { Component } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeNav from './home-nav'
import AccountNav from './account-nav'
import MyReviewsNav from './my-reviews-nav'
import LikedReviewsNav from './liked-reviews-nav'
import FavouritesNav from './favourite-shops-nav'
import Logout from '../screens/logout-page'

const Drawer = createDrawerNavigator()

class DrawerNav extends Component {
  render () {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name='Home' component={HomeNav} />
        <Drawer.Screen name='Account' component={AccountNav} />
        <Drawer.Screen name='My Reviews' component={MyReviewsNav} />
        <Drawer.Screen name='Liked Reviews' component={LikedReviewsNav} />
        <Drawer.Screen name='Coffee Shops' component={FavouritesNav} />
        <Drawer.Screen name='Logout' component={Logout} />
      </Drawer.Navigator>
    )
  }
}
export default DrawerNav