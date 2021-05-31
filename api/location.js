import { Component } from 'react'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
//getting user location
class LocationFetch extends Component {
  async getLocationInfo (locID) {
    const token = await AsyncStorage.getItem('@token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locID, {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })//handling errors in getting shop locations 
      .then((response) => {
        if (response.status === 200) {
          console.log('shop fetch successful')
          return response.json()
        } else if (response.status === 404) {
          console.log('shop fetch failed - bad request')
        } else {
          Alert.alert('Something went wrong. Please try again.')
          console.log('shop fetch failed - server error')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
const locationFetch = new LocationFetch()
export default locationFetch