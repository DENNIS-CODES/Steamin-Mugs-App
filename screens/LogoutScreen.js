import React, { Component } from 'react'
import { Text } from 'react-native'
import { Block, Button } from 'galio-framework'
import accountFetch from '../api/account'
import styles from '../css/styles'
//logout uses App components 
class Logout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  async logoutUser () {//authenticating user logout
    const navigation = this.props.navigation
    const status = await accountFetch.logout()
    if (status === 200) {//If API request respond is valid then navigation should be done and if not keep staying in the login screen
      navigation.navigate('Login')
    }
    if (status === 401) {
      navigation.navigate('Login')
    }
  }

  render () {
    const navigation = this.props.navigation
    return (//returning logoutScreen
      <Block
        middle
        style={styles.mainContainer}
      >
        <Text style={styles.logoutText}>Do you want to logout?</Text>
        <Button
          round
          size='small'
          color='#FE5F55'
          style={styles.elevation4}
          onPress={() => this.logoutUser()}
        >
          Logout
        </Button>
        <Button
          round
          size='small'
          color='#FE5F55'
          style={styles.elevation4}
          onPress={() => navigation.navigate('Home')}
        >
          Go Home
        </Button>
      </Block>
    )
  }
}

export default 