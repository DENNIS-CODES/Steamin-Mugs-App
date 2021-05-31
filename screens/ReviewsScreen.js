import React, { Component } from 'react'
import { Image, ScrollView, ActivityIndicator, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Block, Button, Icon } from 'galio-framework'
import { AirbnbRating } from 'react-native-ratings'
import userFetch from '../api/user'
import styles from '../css/styles'

class MyReviews extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      noData: true,
      userReviewData: []
    }
  }
//verifying user
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
        this.getUserReviews()
      })
    }
  }

  componentWillUnmount () {
    this.unmount()
  }

  async getUserReviews () {
    const userReviewData = await userFetch.getUserDetails()
    this.setState({ userReviewData: userReviewData, isLoading: false }, () => {
      this.hasData()
    })
  }
//getting user review data
  hasData () {
    const { userReviewData } = this.state

    if (userReviewData.reviews.length) {
      this.setState({ noData: false })
    }
  }

  render () {
    const navigation = this.props.navigation
    const { isLoading, noData, userReviewData } = this.state

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

    return (
      <Block>
        <ScrollView>
          <Block middle style={styles.pTop20}>
            <Image
              style={styles.largeHeaderIcon}
              source={{ uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613924689/MobileApp/rating_sjkpo9.png' }}
            />
          </Block>
          {noData
            ? <Block middle style={styles.pTop20}>
              <Text style={styles.noDataText}>You have not posted any reviews.</Text>
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
          {userReviewData && userReviewData.reviews && userReviewData.reviews.map((card, index) => (
            <Block
              key={index}
              row center card shadow space='between' style={styles.myReviewsCard}
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
                <Text style={styles.myReviewsCardText}>{card.location.location_town}</Text>
                <Text style={styles.reviewCardLikes}>{card.review.review_body}</Text>
              </Block>
              <Button
                onPress={() => navigation.navigate('Review', { reviewID: card.review.review_id, overall: card.review.overall_rating, price: card.review.price_rating, quality: card.review.quality_rating, cleanliness: card.review.clenliness_rating, body: card.review.review_body, locID: card.location.location_id, location: card.location.location_name, town: card.location.location_town, photo: null })} style={{
                  width: 16 * 2,
                  backgroundColor: 'transparent',
                  elevation: 0
                }}
              >
                <Block flex>
                  <Text style={styles.editText}>Edit</Text>
                  <Icon size={20} name='form' family='AntDesign' color='#7B8CDE' />
                </Block>
              </Button>
            </Block>
          ))}
        </ScrollView>
      </Block>
    )
  }
}

export default MyReviews