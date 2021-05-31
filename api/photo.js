import { Component } from 'react'
import { Alert, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

class PhotoFetch extends Component {
  async checkForPhoto (locID, reviewID) {
    const photo = await this.getPhoto(locID, reviewID)
    return photo
  }

  async postPhoto (locID, revID, photo) {
    const token = await AsyncStorage.getItem('@token')
    photo = photo.base64

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/review/' + revID + '/photo', {
      method: 'post',
      headers: {
        'Content-Type': 'image/jpeg',
        'X-Authorization': token
      },
      body: JSON.stringify(photo)
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('new photo successful')
        } else if (response.status === 400) {
          console.log('new photo failed - bad request')
        } else if (response.status === 401) {
          Alert.alert('Please login to use this feature')
          console.log('new photo failed - unauthorised')
        } else if (response.status === 404) {
          console.log('new photo failed - not found')
        } else {
          Alert.alert('Something went wrong. Please try again.')
          console.log('new photo failed - server error')
        }
        return response.status
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async getPhoto (locID, reviewID) {
    const token = await AsyncStorage.getItem('@token')

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/review/' + reviewID + '/photo', {
      headers: {
        'Content-Type': 'image/jpeg',
        'X-Authorization': token
      }
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('get photo successful')
          return response.json()
        } else if (response.status === 404) {
          console.log('No photo found for review')
          return null
        } else {
          Alert.alert('Something went wrong. Please try again.')
          console.log('get photo failed - server error')
        }
      })
      .then((Json) => {
        return Json
      })//Error handling
      .catch((error) => {
        console.log(error)
      })
  }
//awaitng photo deleted action 
  async deletePhoto (locID, reviewID) {
    const token = await AsyncStorage.getItem('@token')

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/review/' + reviewID + '/photo', {
      method: 'delete',
      headers: {
        'Content-Type': 'image/jpeg',
        'X-Authorization': token
      }
    })//alert box responses when photo is deleted
      .then((response) => {
        if (response.status === 200) {
          ToastAndroid.show('Photo Deleted', ToastAndroid.SHORT)
          console.log('delete photo successful')
        } else if (response.status === 400) {
          console.log('delete photo failed - bad request')
        } else if (response.status === 401) {
          console.log('delete photo failed - unauthorised')
        } else if (response.status === 404) {
          console.log('delete photo failed - not found')
        } else {
          console.log('delete photo failed - server error')
        }
        return response.status
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
const photoFetch = new PhotoFetch()
export default photoFetch