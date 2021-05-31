import React, { Component } from 'react'
import { Text, Image, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Block, Button, Input } from 'galio-framework'
import { ScrollView } from 'react-native-gesture-handler'
import userFetch from '../api/user'
import styles from '../css/styles'

class Account extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      userDetails: [],
      newFirstName: '',
      newLastName: '',
      newEmail: '',
      newPassword: ''
    }
  }
//checking if components are mounted
  async componentDidMount () {
    const navigation = this.props.navigation
    const token = await AsyncStorage.getItem('@token')
    this.unmount = navigation.addListener('focus', () => {
      this.componentDidMount()
    })
    if (token === null || token === undefined || token === '') {
      console.log('no token')
      navigation.navigate('Login')
    } else {
      console.log(token)
      this.setState({ isLoading: true }, () => {
        this.getUserDetails()
      })
    }
  }

  componentWillUnmount () {
    this.unmount()
  }
//gverifying user details
  async getUserDetails () {
    const userDetails = await userFetch.getUserDetails()
    this.setState({ userDetails: userDetails }, () => {
      this.setState({ isLoading: false })
    })
  }
//updating user details to account 
  async updateAccount () {
    this.setState({ isLoading: true })
    const navigation = this.props.navigation
    const toSend = {}
    const { userDetails, newFirstName, newLastName, newEmail, newPassword } = this.state

    if (newFirstName !== userDetails.first_name && newFirstName !== '') {
      toSend.first_name = newFirstName
    }
    if (newLastName !== userDetails.last_name && newLastName !== '') {
      toSend.last_name = newLastName
    }
    if (newEmail !== userDetails.email && newEmail !== '') {
      toSend.email = newEmail
    }
    if (newPassword !== '') {
      toSend.password = newPassword
    }

    const status = await userFetch.updateUserDetails(toSend)
    if (status === 200) {
      this.getUserDetails()
    }
    if (status === 401) {
      navigation.navigate('Login')
    }
    if (status === 404) {
      navigation.navigate('Logout')
    }
  }
  render () {
    const { isLoading, userDetails } = this.state

    if (isLoading) {
      return (
        <Block
          middle
          style={styles.mainContainer}
        >
          <ActivityIndicator size='large' color='#7B8CDE' />
        </Block>
      )
    }

    return (
      <ScrollView>
        <Block>
          <Block middle style={styles.pTop40}>
            <Image
              style={styles.headerIcon}
              source={{ uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1612982465/MobileApp/profile-purple_sapa50.png' }}
            />
            <Text style={styles.accountTitle}>Account Details</Text>
            <Text style={styles.accountSubTitle}>Edit your details below and then click the button to update your account.</Text>
          </Block>
          <Block
            middle
            style={styles.accountContainer}
          >
            <Input
              rounded
              placeholder={userDetails.first_name}
              style={styles.textInput}
              placeholderTextColor='#001D4A'
              onChangeText={(newFirstName) => this.setState({ newFirstName })}
            />
            <Input
              rounded
              placeholder={userDetails.last_name}
              style={styles.textInput}
              placeholderTextColor='#001D4A'
              onChangeText={(newLastName) => this.setState({ newLastName })}
            />
            <Input
              type='email-address'
              rounded
              placeholder={userDetails.email}
              style={styles.textInput}
              placeholderTextColor='#001D4A'
              onChangeText={(newEmail) => this.setState({ newEmail })}
            />
            <Input
              password
              rounded
              placeholder='********'
              style={styles.textInput}
              icon='lock'
              family='antdesign'
              iconColor='#001D4A'
              right
              help='Minimum 6 characters'
              bottomHelp
              placeholderTextColor='#001D4A'
              onChangeText={(newPassword) => this.setState({ newPassword })}
            />
          </Block>
          <Block
            middle
            style={styles.pTop10}
          >
            <Button
              round
              size='large'
              color='#FE5F55'
              style={styles.elevation4}
              onPress={() => this.updateAccount()}
            >
              Update Account
            </Button>
          </Block>
        </Block>
      </ScrollView>
    )
  }
}

export default Account