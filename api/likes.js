import { Component } from 'react'
import { ToastAndroid, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
//LikeFetch uses some of the App components
class LikeFetch extends Component {
  async likeReview (locID, reviewID) {
    const token = await AsyncStorage.getItem('@token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/review/' + reviewID + '/like', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })//Authenticating Review likes 
      .then((response) => {
        if (response.status === 200) {
          ToastAndroid.show('Review liked', ToastAndroid.SHORT)
          console.log('like review successful')
        } else if (response.status === 400) {
          Alert.alert('Something went wrong. Please close the app and try again.')
          console.log('like review failed - bad request')
        } else if (response.status === 401) {
          Alert.alert('Please login to use this feature')
          console.log('like review failed - unauthorised')
        } else if (response.status === 404) {
          Alert.alert('Apologies we cannot like this review. Please log out and log back in.')
          console.log('like review failed - not found')
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
//awaiting to authenticate reviews 
  async unlikeReview (locID, reviewID) {
    const token = await AsyncStorage.getItem('@token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/review/' + reviewID + '/like', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })
      .then((response) => {
        if (response.status === 200) {
          ToastAndroid.show('Review unliked', ToastAndroid.SHORT)
          console.log('unlike review successful')
        } else if (response.status === 401) {
          Alert.alert('Please login to use this feature')
          console.log('unlike review failed - unauthorised')
        } else if (response.status === 403) {
          Alert.alert('Something went wrong. Please close the app and try again.')
          console.log('unlike review failed - bad request')
        } else if (response.status === 404) {
          Alert.alert('Apologies we cannot unlike this review. Please log out and log back in.')
          console.log('unlike review failed - not found')
        } else {
          Alert.alert('Something went wrong. Please try again.')
          console.log('unlike review failed - server error')
        }
        return response.status
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
const likeFetch = new LikeFetch()
export default likeFetch