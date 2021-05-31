import React, { Component } from 'react'
import { Image, ScrollView, ActivityIndicator, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Block, Button, Icon } from 'galio-framework'
import { AirbnbRating } from 'react-native-ratings'
import userFetch from '../api/user'
import styles from '../css/styles'
//class LikedReviews shares app components
class LikedReviews extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      noData: true,
      likedReviews: []
    }
  }
// awaits reciving navigation token
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
      this.setState({
        isLoading: true,
        noData: true
      }, () => {
        this.getLikedReviews()
      })
    }
  }

  componentWillUnmount () {
    this.unmount()
  }
//waiting number of liked reviews
  async getLikedReviews () {
    const likedReviews = await userFetch.getUserDetails()
    this.setState({ likedReviews: likedReviews, isLoading: false }, () => {
      this.hasData()
    })
  }
//getting liked reviews
  hasData () {
    const { likedReviews } = this.state

    if (likedReviews.liked_reviews.length) {
      this.setState({ noData: false })
    }
  }

  render () {
    const navigation = this.props.navigation
    const { isLoading, noData, likedReviews } = this.state

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

    return (//returns liked reviews screen
      <Block>
        <ScrollView>
          <Block middle style={styles.pTop20}>
            <Image
              style={styles.largeHeaderIcon}
              source={{ uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613925094/MobileApp/like_h5wpna.png' }}
            />
          </Block>
          {noData
            ? <Block middle style={styles.pTop20}>
              <Text style={styles.noDataText}>You have not liked any reviews.</Text>
              <Button
                round
                size='small'
                color='#7B8CDE'
                style={styles.mainBtn}
                onPress={() => navigation.navigate('Home')}
              >
                Go Home
              </Button>
              </Block>
            : <Block />}
          {likedReviews && likedReviews.liked_reviews && likedReviews.liked_reviews.map((card, index) => (
            <Block
              key={index}
              row center card shadow space='between' style={styles.likedReviewsCard}
            >
              <Image
                style={styles.thumbnail}
                source={{ uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1612974806/MobileApp/coffee_midath.png' }}
              />
              <Block flex style={styles.pLeft10}>
                <Text style={styles.text19}>{card.location.location_name}</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={card.review.overall_rating}
                  size={20}
                  selectedColor='#06D6A0'
                  isDisabled
                  showRating={false}
                  starContainerStyle={{
                    alignItems: 'flex-start',
                    alignSelf: 'flex-start'
                  }}
                />
                <Text style={styles.likedCardText}>{card.location.location_town}</Text>
                <Text style={styles.reviewCardLikes}>{card.review.review_body}</Text>
              </Block>
              <Button
                onPress={() => navigation.navigate('Review', { reviewID: card.review.review_id, overall: card.review.overall_rating, price: card.review.price_rating, quality: card.review.quality_rating, cleanliness: card.review.clenliness_rating, body: card.review.review_body, locID: card.location.location_id, location: card.location.location_name, town: card.location.location_town, photo: null })} style={{
                  width: 16 * 2,
                  backgroundColor: 'transparent',
                  elevation: 0
                }}
              >
                <Block middle>
                  <Icon size={20} name='doubleright' family='AntDesign' color='#7B8CDE' />
                </Block>
              </Button>
            </Block>
          ))}
        </ScrollView>
      </Block>
    )
  }
}

export default LikedReviews