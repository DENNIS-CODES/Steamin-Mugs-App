import { Component } from 'react'
import { ToastAndroid, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

class FavouriteFetch extends Component {
  async favouriteLocation (id, location) {
    const token = await AsyncStorage.getItem('@token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + id + '/favourite', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })//pop up Toast dialogue boxes
      .then((response) => {
        if (response.status === 200) {
          ToastAndroid.show(location + ' added to Favourites', ToastAndroid.SHORT)
          console.log('add favourite successful')
        } else if (response.status === 400) {
          Alert.alert('Something went wrong. Please close the app and try again.')
          console.log('add favourite failed - bad request')
        } else if (response.status === 401) {
          Alert.alert('Please login to use this feature')
          console.log('add favourite failed - unauthorised')
        } else if (response.status === 404) {
          Alert.alert('Apologies we cannot favourite this shop. Please log out and log back in.')
          console.log('add favourite failed - not found')
        } else {
          Alert.alert('Something went wrong. Please try again.')
          console.log('shop fetch failed - server error')
        }
        return response.status
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async unfavouriteLocation (id, location) {
    const token = await AsyncStorage.getItem('@token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + id + '/favourite', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })
      .then((response) => {//pop up alerts 
        if (response.status === 200) {
          ToastAndroid.show(location + ' removed from Favourites', ToastAndroid.SHORT)
          console.log('delete favourite successful')
        } else if (response.status === 401) {
          Alert.alert('Please login to use this feature')
          console.log('delete favourite failed - unauthorised')
        } else if (response.status === 403) {
          Alert.alert('Something went wrong. Please close the app and try again.')
          console.log('delete favourite failed - bad request')
        } else if (response.status === 404) {
          Alert.alert('Apologies we cannot unfavourite this shop. Please log out and log back in.')
          console.log('delete favourite failed - not found')
        } else {
          Alert.alert('Something went wrong. Please try again.')
          console.log('delete fetch failed - server error')
        }
        return response.status
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
const favouriteFetch = new FavouriteFetch()
export default favouriteFetch