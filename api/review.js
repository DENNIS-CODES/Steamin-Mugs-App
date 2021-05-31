import { Component } from 'react'
import { ToastAndroid, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
//ReviewFetch uses App components
class ReviewFetch extends Component {
  async addReview (locID, overallRating, priceRating, qualityRating, clenlinessRating, reviewBody) {
    const token = await AsyncStorage.getItem('@token')
    const toSend = {//immiutable keys cannot be changed
      overall_rating: overallRating,
      price_rating: priceRating,
      quality_rating: qualityRating,
      clenliness_rating: clenlinessRating,
      review_body: reviewBody
    }

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/review', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      },
      body: JSON.stringify(toSend)
    })//alert box for posting a review action
      .then((response) => {
        if (response.status === 201) {
          ToastAndroid.show('Review Posted Successfully', ToastAndroid.SHORT)
          console.log('new review successful')
        } else if (response.status === 400) {
          Alert.alert('Review failed. Please ensure all fields are completed before you post.')
          console.log('new review failed - bad request')
        } else if (response.status === 401) {
          Alert.alert('Please login to use this feature')
        } else if (response.status === 404) {
          Alert.alert('Apologies we cannot post this review. Please log out and log back in.')
          console.log('new review failed - not found')
        } else {
          Alert.alert('Something went wrong. Please try again.')
          console.log('new review failed - server error')
        }
        return response.status
      })
      .catch((error) => {
        console.log(error)
      })
  }
//await updating review action
  async updateReview (locID, reviewID, toSend) {
    const token = await AsyncStorage.getItem('@token')

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/review/' + reviewID, {
      method: 'patch',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      },
      body: JSON.stringify(toSend)
    })//alert box for updating reviews 
      .then((response) => {
        if (response.status === 200) {
          ToastAndroid.show('Review Updated Successfully', ToastAndroid.SHORT)
          console.log('review update successful')
        } else if (response.status === 400) {
          Alert.alert('Please edit the review before updating.')
          console.log('review update failed - bad request')
        } else if (response.status === 401) {
          Alert.alert('Please login to use this feature')
          console.log('review update failed - unauthorized')
        } else if (response.status === 403) {
          Alert.alert('Something went wrong. Please close the app and try again.')
          console.log('review update failed - forbidden')
        } else if (response.status === 404) {
          Alert.alert('Apologies we cannot find your review details. Please log out and log back in.')
          console.log('review update failed - not found')
        } else {
          Alert.alert('Something went wrong. Please try again.')
          console.log('review update failed - server error')
        }
        return response.status
      })
      .catch((error) => {
        console.log(error)
      })
  }
//awaiting delete action
  async deleteReview (locID, reviewID) {
    const token = await AsyncStorage.getItem('@token')

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/review/' + reviewID, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })//alert box for deleting reviews action
      .then((response) => {
        if (response.status === 200) {
          ToastAndroid.show('Review Deleted', ToastAndroid.SHORT)
          console.log('delete review successful')
        } else if (response.status === 400) {
          Alert.alert('Something went wrong. Please close the app and try again.')
          console.log('delete review failed - bad request')
        } else if (response.status === 401) {
          Alert.alert('Please login to use this feature')
          console.log('delete review failed - unauthorized')
        } else if (response.status === 403) {
          Alert.alert('Something went wrong. Please close the app and try again.')
          console.log('delete review failed - forbidden')
        } else if (response.status === 404) {
          Alert.alert('Apologies we cannot find this review in our system. Please log out and log back in.')
          console.log('delete review failed - not found')
        } else {
          Alert.alert('Something went wrong. Please try again.')
          console.log('delete review failed - server error')
        }
        return response.status
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
const reviewFetch = new ReviewFetch()
export default reviewFetch