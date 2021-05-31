import React, { Component } from 'react'
import { Text, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from 'react-native-gesture-handler'
import { Block, Button, Input } from 'galio-framework'
import accountFetch from '../api/account'
import styles from '../css/styles'
//State variables only stores data in memory
//Mounting methods are called in the following order when an instance of a componnet is being created and inserted into the DOM
//constructor()
//static getDerivedStateFromProps()
//render()
//componentDidMount()
class Login extends Component {
    constructor (props) {//initializes and bind methods
      super(props)
      this.state = {//The state contains data specific to this component that may change over time
        isLoading: true,
        email: '',
        password: ''
      }
    }//Treat this.state as if it were immutable.
  
    async loginUser () {
      const navigation = this.props.navigation
      const toSend = {
        email: this.state.email,
        password: this.state.password
      }
      const response = await accountFetch.login(toSend)
      await AsyncStorage.setItem('@token', String(response.token))
      await AsyncStorage.setItem('@id', String(response.id))
      navigation.navigate('Home')
    }
  
    render () {//testing library for shring products
      const navigation = this.props.navigation
      return (//returns navigation view
        <ScrollView>
          <Block>
            <Block
              middle
              style={styles.loginContainer}
            >
              <Block
                middle style={styles.padding10}
              >
                <Image
                  style={styles.loginImg}
                  source={{ uri: 'http://res.cloudinary.com/software-company/image/upload/v1621008005/My_Post_3_r7o4qt.png' }}
                />
              </Block>
              <Input //getting email fro user
                type='email-address'
                rounded
                placeholder='Email'
                style={styles.textInput}
                placeholderTextColor='#001D4A'
                onChangeText={(email) => this.setState({ email })}
                value={this.state.email}
              />
              //get password
              <Input //getting text password from user
                password
                rounded
                placeholder='Password'
                style={styles.textInput}
                icon='lock'
                family='antdesign'
                iconColor='#697177'
                right
                placeholderTextColor='#001D4A'
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password}
              />
            </Block>
            <Block
              middle
              style={styles.pTop10}
            > //login button
              <Button 
              //creating login Button
                round
                size='large'
                color='#55feac'
                style={styles.elevation4}
                onPress={() => this.loginUser()}
              >
                Login
              </Button>
              <Text style={styles.accountText}>Don't Have an Account?</Text> //alert
              <Button
                round
                size='small'
                color='#FE5F55'
                style={styles.elevation4}
                onPress={() => navigation.navigate('Sign Up')}
              >
                Sign Up
              </Button>
            </Block>
          </Block>
        </ScrollView>
      )
    }
  }
  
  export default Login