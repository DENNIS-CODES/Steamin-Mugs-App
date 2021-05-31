import { Component } from 'react'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
//SearchQuery uses App components
class SearchQuery extends Component {
  constructor (props) {
    super(props)
    this.state = {//mutable state
    }
  }
//waiting overall ratings and reviews for a shop location
  async findLocations (shopName, overallRating, priceRating, qualityRating, clenlinessRating, favourites, myReviews, offset) {
    const toSend = {}

    if (shopName !== '') {
      toSend.q = shopName
    }
    if (overallRating !== 0) {
      toSend.overall_rating = overallRating
    }
    if (priceRating !== 0) {
      toSend.price_rating = priceRating
    }
    if (qualityRating !== 0) {
      toSend.quality_rating = qualityRating
    }
    if (clenlinessRating !== 0) {
      toSend.clenliness_rating = clenlinessRating
    }
    if (favourites !== '') {
      toSend.search_in = favourites
    }
    if (myReviews !== '') {
      toSend.search_in = myReviews
    }

    toSend.limit = 1
    toSend.offset = offset
    const queryStr = this.buildQuery(toSend)
    const results = await this.search(queryStr)

    return results
  }

  async getAll () {
    const results = await this.search('')
    return results
  }

  buildQuery (toSend) {
    const pairs = []
    for (const param in toSend) {
      pairs.push(encodeURIComponent(param) + '=' + encodeURIComponent(toSend[param]))
    }
    return pairs.join('&')
  }

  async search (queryStr) {
    const token = await AsyncStorage.getItem('@token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/find?' + queryStr, {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('search successful')
          return response.json()
        } else if (response.status === 400) {
          console.log('search failed - bad request')
        } else if (response.status === 401) {
          Alert.alert('Please login to use this feature')
          console.log('search failed - not logged in')
        } else {
          Alert.alert('Something went wrong. Please try again.')
          console.log('search failed - server error')
        }
      })
      .then((Json) => {
        return Json
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
const search = new SearchQuery()
export default search