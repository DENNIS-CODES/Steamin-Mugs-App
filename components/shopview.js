  
import React, { Component } from 'react'
import { ActivityIndicator, ScrollView, Image, Text } from 'react-native'
import { Block, Button, Icon } from 'galio-framework'
import { AirbnbRating } from 'react-native-ratings'
import { TouchableOpacity } from 'react-native-gesture-handler'
import openMap from 'react-native-open-maps'
import locationFetch from '../api/location'
import favouriteFetch from '../api/favourites'
import userFetch from '../api/user'
import styles from '../css/styles'

class Shop extends Component { //class shop uses components from our App.js
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      locID: '',
      path: '',
      distance: 0,
      shopInfo: [],
      userDetails: [],
      isFavourited: false
    }
  }
//allow us to have nicer syntax for anything that does an asynchronous operation (API call, DB query, timeout
//fetches data
  async componentDidMount () {
    const { route } = this.props
    const { locID, path, distance } = route.params
    this.setState({
      isLoading: true,
      isFavourited: false,
      locID: locID,
      path: path,
      distance: distance
    }, () => {
      this.getShop()
    })
  }
//gets shop data
  async getShop () {
    const locID = this.state.locID
    const shopInfo = await locationFetch.getLocationInfo(locID)
    this.setState({ shopInfo: shopInfo }, () => {
      this.getUserDetails()
    })
  }
//gets user details
  async getUserDetails () {
    const userDetails = await userFetch.getUserDetails()
    this.setState({
      userDetails: userDetails,
      isLoading: false
    }, () => {
      this.checkData()
    })
  }
//varifies user data
  checkData () {
    const { userDetails } = this.state

    userDetails.favourite_locations && userDetails.favourite_locations.map((data, index) => (
      this.getFavourite(data)
    ))
  }
//gets shops close to user location
  getFavourite (data) {
    const { shopInfo } = this.state
    const id = shopInfo.location_id
    if (data.location_id === id) {
      this.setState({ isFavourited: true }, () => {
        this.setState({ isLoading: false })
      })
    }
  }

  async handleFavourite () {
    const { shopInfo, isFavourited } = this.state
    const id = shopInfo.location_id
    const location = shopInfo.location_name
    if (isFavourited) {
      const status = await favouriteFetch.unfavouriteLocation(id, location)
      const favourite = false
      this.handleStatus(status, favourite)
    } else {
      const status = await favouriteFetch.favouriteLocation(id, location)
      const favourite = true
      this.handleStatus(status, favourite)
    }
  }
//handles mavigation status
  handleStatus (status, favourite) {
    const navigation = this.props.navigation
    if (status === 200) {
      this.setState({ isFavourited: favourite }, () => {
        this.getUserDetails()
      })
    }
    if (status === 401) {
      navigation.navigate('Login')
    }
    if (status === 404) {
      navigation.navigate('Logout')
    }
  }

  openMaps () {
    const shopInfo = this.state.shopInfo
    openMap({ latitude: shopInfo.latitude, longitude: shopInfo.longitude, provider: 'google' })
  }
  //A component with a render prop takes a function that returns a React element and calls it instead of implementing its own render logic. 
  render () {
    const navigation = this.props.navigation
    const { isLoading, path, distance, shopInfo, isFavourited } = this.state

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
//returns coffee shops close to user location together with its coffee, reviws and ratings
    return (
      <Block>
        <ScrollView>
          <Block
            middle
            style={styles.margin15}
          >
            <Image
              style={styles.bannerImage}
              source={{ uri: path }}
            />
            <Block
              middle style={styles.shopContainer}
            >
              <Block row middle>
                <Text style={styles.locationNameText}>{shopInfo.location_name}</Text>
                <TouchableOpacity onPress={() => this.handleFavourite()}>
                  {isFavourited
                    ? <Icon size={35} name='star' family='Ionicons' color='#FE5F55' />
                    : <Icon size={35} name='star-outline' family='Ionicons' color='#FE5F55' />}
                </TouchableOpacity>
              </Block>
              <Text style={styles.shopText}>{shopInfo.location_town}</Text>
              <TouchableOpacity onPress={() => this.openMaps()}>
                <Block
                  row
                  middle
                  style={styles.mTop5}
                >
                  <Icon size={18} name='enviroment' family='AntDesign' color='#697177' />
                  <Text style={styles.shopDistanceText}>{distance} Kilometers away</Text>
                </Block>
              </TouchableOpacity>
            </Block>
            <Block
              middle style={styles.reviewBlock2}
            >
              <Text style={styles.reviewTitle}>Reviews</Text>
              <Block row>
                <Text style={styles.ratingText}>Overall</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={shopInfo.avg_overall_rating}
                  size={20}
                  selectedColor='#F5B700'
                  isDisabled
                  showRating={false}
                  starContainerStyle={{
                    alignItems: 'flex-start',
                    alignSelf: 'flex-start'
                  }}
                />
              </Block>
              <Block row>
                <Text style={styles.ratingText}>Price</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={shopInfo.avg_price_rating}
                  size={20}
                  selectedColor='#F5B700'
                  isDisabled
                  showRating={false}
                  starContainerStyle={{
                    alignItems: 'flex-start',
                    alignSelf: 'flex-start'
                  }}
                />
              </Block>
              <Block row>
                <Text style={styles.ratingText}>Quality</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={shopInfo.avg_quality_rating}
                  size={20}
                  selectedColor='#F5B700'
                  isDisabled
                  showRating={false}
                  starContainerStyle={{
                    alignItems: 'flex-start',
                    alignSelf: 'flex-start'
                  }}
                />
              </Block>
              <Block row>
                <Text style={styles.ratingText}>Cleanliness</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={shopInfo.avg_clenliness_rating}
                  size={20}
                  selectedColor='#F5B700'
                  isDisabled
                  showRating={false}
                  starContainerStyle={{
                    alignItems: 'flex-start',
                    alignSelf: 'flex-start'
                  }}
                />
              </Block>
              <Block>
                <Button
                  round
                  size='small'
                  color='#FE5F55'
                  style={styles.writeReviewBtn}
                  onPress={() => navigation.navigate('ReviewForm', { locID: shopInfo.location_id, location: shopInfo.location_name, town: shopInfo.location_town, photo: null })}
                >
                  Write Review
                </Button>
              </Block>
              {shopInfo && shopInfo.location_reviews && shopInfo.location_reviews.map((card, index) => (
                <Block
                  key={index}
                  row center card shadow space='between' style={styles.reviewCard}
                >
                  <Image
                    style={styles.thumbnail}
                    source={{ uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613062691/MobileApp/rating_1_cnr0eb.png' }}
                  />
                  <Block middle flex style={styles.pHorizontal10}>
                    <Text style={styles.text18}>Overall Rating</Text>
                    <AirbnbRating
                      count={5}
                      defaultRating={card.overall_rating}
                      size={20}
                      selectedColor='#F5B700'
                      isDisabled
                      showRating={false}
                      starContainerStyle={{
                        alignItems: 'flex-start',
                        alignSelf: 'flex-start'
                      }}
                    />
                    <Text style={styles.reviewCardBody}>{card.review_body}</Text>
                    <Text style={styles.reviewCardLikes}>({card.likes} Likes)</Text>
                  </Block>
                  <Block middle>
                    <TouchableOpacity onPress={() => navigation.navigate('Review', { reviewID: card.review_id, overall: card.overall_rating, price: card.price_rating, quality: card.quality_rating, cleanliness: card.clenliness_rating, body: card.review_body, locID: shopInfo.location_id, location: shopInfo.location_name, town: shopInfo.location_town, photo: null })}>
                      <Icon size={28} name='arrowright' family='AntDesign' color='#FE5F55' />
                    </TouchableOpacity>
                  </Block>

                </Block>
              ))}
            </Block>
          </Block>
        </ScrollView>
      </Block>
    )
  }
}

export default Shop