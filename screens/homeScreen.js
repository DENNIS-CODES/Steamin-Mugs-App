import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { Image, ActivityIndicator, PermissionsAndroid, Text } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Block, Button, Icon } from 'galio-framework'
import { AirbnbRating } from 'react-native-ratings'
import Geolocation from 'react-native-geolocation-service'
import haversine from 'haversine'
import search from '../api/search'
import styles from '../css/styles'
//Home class use our App components 
class Home extends Component {
  constructor (props) { //a method used to initialize an object's state in a class
    super(props)//called when implementing contructor props
    this.state = {//means the props are mutable they can be changed anytime
      hasPermission: false,
      distances: {},
      isLoading: true,
      shopCardInfo: [],
      shopName: '',
      overallRating: 0,
      priceRating: 0,
      qualityRating: 0,
      clenlinessRating: 0,
      favourites: '',
      myReviews: '',
      offset: 0
    }
  }
//telling the function to stop executing untill it gets token
  async componentDidMount () {
    const navigation = this.props.navigation
    const token = await AsyncStorage.getItem('@token')
    this.unmount = navigation.addListener('focus', () => {
      this.componentDidMount()
    })
    if (token === null || token === undefined || token === '') {
      console.log('Need to Login')
      navigation.navigate('Login')
    } else {
      console.log('User logged in - ' + token)
      this.setState({
        shopCardInfo: [],
        isLoading: true
      }, () => {
        this.requestLocationPermission()
      })
    }
  }

  componentWillUnmount () {
    this.unmount()
  }
//tells requestlocation permission to stop executing until permission is granted or denied by user
  async requestLocationPermission () {
    const hasPermission = this.state.hasPermission
    if (!hasPermission) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Allow CoffiDa to access your location?',
            message: 'We need permission to access your location',
            buttonNegative: 'No',
            buttonPositive: 'OK'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.setState({ hasPermission: true }, () => {
            this.getShopData()
          })
        } else {
          this.getShopData()
        }
      } catch (error) {
        console.log(error)
      }
    }
    this.getShopData()
  }
//stops executing getShopData function when data is received 
  async getShopData () {
    const data = await search.getAll()
    this.setState({ shopCardInfo: data }, () => {
      this.getDistance()
      this.setState({ isLoading: false })
    })
  }
//gets distance
  getDistance () {
    const { hasPermission, shopCardInfo } = this.state
    if (hasPermission) {
      Geolocation.getCurrentPosition(
        async (position) => {
          const start = { latitude: position.coords.latitude, longitude: position.coords.longitude }
          shopCardInfo.forEach(item => {
            const end = { latitude: item.latitude, longitude: item.longitude }
            const distance = Math.round(haversine(start, end))
            this.setState({ distances: { location: item.location_id, distance: distance } })
          })
        },
        (error) => {
          console.log(error)
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      )
    }
    if (!hasPermission) {
      // no access to location
    }
  }

  render () {
    const navigation = this.props.navigation
    const { isLoading, shopCardInfo, distances } = this.state

    const imagePaths = [
      {
        uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613053623/MobileApp/pexels-igor-starkov-1002740_jqapwj.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613053629/MobileApp/pexels-quark-studio-2506993_jhagmt.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613053643/MobileApp/pexels-lisa-fotios-1024359_oiqien.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613053619/MobileApp/pexels-lisa-fotios-1995010_khjtql.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613053634/MobileApp/pexels-anna-tukhfatullina-food-photographerstylist-2551794_mxzjzw.jpg'
      }
    ]

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

    return (//returns coffee shops in home page
      <Block>
        <ScrollView>
          <Block
            row
            space='between'
            style={styles.homeContainer}
          >
            <Block>
              <Image
                style={styles.coffidaBanner}
                source={{ uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613039533/MobileApp/coffida-purple_srvd8k.png' }}
              />
            </Block>
            <Button
              onlyIcon
              icon='search1'
              iconFamily='antdesign'
              iconSize={20}
              iconColor='#FFFFFF'
              color='#7B8CDE'
              style={styles.elevation4}
              onPress={() => navigation.navigate('Search')}
            />
          </Block>
          {shopCardInfo && shopCardInfo.map((data, index) => (
            <Block
              key={index}
              center card shadow space='between' style={styles.homeCard}
            >
              <TouchableOpacity onPress={() => navigation.navigate('Shop', { locID: data.location_id, path: imagePaths[index].uri, distance: distances.distance })}>
                <Block>
                  <Block
                    row
                    center
                    style={styles.mBottom10}
                  >
                    <Image
                      style={styles.cardImage}
                      source={{ uri: imagePaths[index].uri }}
                    />
                  </Block>
                  <Block
                    row
                    center
                    style={styles.pHorizontal15}
                  >
                    <Image
                      style={styles.thumbnail}
                      source={{ uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1612974814/MobileApp/restaurant_zusegh.png' }}
                    />
                    <Block flex style={styles.pLeft15}>
                      <AirbnbRating
                        count={5}
                        defaultRating={data.avg_overall_rating}
                        size={20}
                        selectedColor='#06D6A0'
                        isDisabled
                        showRating={false}
                        starContainerStyle={{
                          alignItems: 'flex-start',
                          alignSelf: 'flex-start'
                        }}
                      />
                      <Text style={styles.text19}>{data.location_name}</Text>
                      <Text style={styles.homeCardText}>{data.location_town}</Text>

                    </Block>
                    <Block row>
                      <Icon size={18} name='enviroment' family='AntDesign' color='#7B8CDE' />
                      <Text style={styles.distanceText}>{distances.distance} Km</Text>
                    </Block>
                  </Block>
                </Block>
              </TouchableOpacity>
            </Block>
          ))}
        </ScrollView>
      </Block>
    )
  }
}

export default Home