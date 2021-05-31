import React, { Component } from 'react'
import { Text, ActivityIndicator, ScrollView, Image, Alert } from 'react-native'
import { Block, Button, Icon, Input } from 'galio-framework'
import { AirbnbRating } from 'react-native-ratings'
import { TouchableOpacity } from 'react-native-gesture-handler'
import userFetch from '../api/user'
import reviewFetch from '../api/review'
import likeFetch from '../api/likes'
import photoFetch from '../api/photo'
import profFilter from '../components/profanity-filter.json'
import styles from '../css/styles'
//creating review function class
/* class components This gives the class App access to the React lifecycle methods
 like render as well as state/props */
  constructor (props) {//constructor() method also initializes the component’s state object: this.state 
class Review extends Component {
    super(props)
    this.state = {
      profFilter: profFilter.profWords,
      block: false,
      reviewID: '',
      overall: '',
      price: '',
      quality: '',
      cleanliness: '',
      body: '',
      locID: '',
      location: '',
      town: '',
      userData: [],
      isLoading: true,
      isMyReview: false,
      isLiked: false,
      hasPhoto: false,
      overallRating: 0,
      priceRating: 0,
      qualityRating: 0,
      clenlinessRating: 0,
      reviewBody: '',
      photo: '',
      base64Img: ''
    }
  }
//asnyc is placed infront of a function declaration to turn it into an async function
  async componentDidMount () {
    const { navigation, route } = this.props
    const { reviewID, overall, price, quality, cleanliness, body, locID, location, town, photo } = route.params
    this.setState({ block: false })
    this.unmount = navigation.addListener('focus', () => {
      this.componentDidMount()
    })
    if (photo !== null) {
      console.log('Photo found')
      this.setState({ isLoading: true, photo: photo }, () => {
        this.setPhoto(photo)
      })
    }
    if (photo === null) {
      console.log('No photo')
      this.setState({
        isLoading: true,
        isMyReview: false,
        isLiked: false,
        hasPhoto: false,
        reviewID: reviewID,
        overall: overall,
        price: price,
        quality: quality,
        cleanliness: cleanliness,
        body: body,
        locID: locID,
        location: location,
        town: town
      }, () => {
        this.getUserDetails()
      })
    }
  }

  componentWillUnmount () {
    this.unmount()
  }

  setPhoto (photo) {
    const base64img = 'data:image/jpeg;base64,' + photo.base64
    this.setState({ hasPhoto: true, base64Img: base64img }, () => {
      this.setState({ isLoading: false })
    })//State is similar to props, but it is private and fully controlled by the component.
  }

  async getUserDetails () {
    const userData = await userFetch.getUserDetails()//await is used to invoke asynchronuos code
    this.setState({ userData: userData }, () => {
      this.compareIDs()
    })
  }
//functional class used for display 
  compareIDs () {
    const { userData, reviewID } = this.state
    userData && userData.reviews.map((data, index) => (
      this.isMyReview(data, reviewID)
    ))
    userData && userData.liked_reviews.map((data, index) => (
      this.isLiked(data, reviewID)
    ))
    this.checkForPhoto()
  }

  isMyReview (data, reviewID) {
    if (data.review.review_id === reviewID) {
      this.setState({ isMyReview: true })
    }
  }

  isLiked (data, reviewID) {
    if (data.review.review_id === reviewID) {
      this.setState({ isLiked: true })
    }
  }

  async checkForPhoto () {
    const { locID, reviewID } = this.state
    let photo = await photoFetch.checkForPhoto(locID, reviewID)
    if (photo !== null) {
      photo = 'data:image/jpeg;base64,' + photo
      this.setState({ base64Img: photo, hasPhoto: true })
    }
    this.setState({ isLoading: false })
  }

  async updateReview () {
    const { hasPhoto, locID, reviewID, overall, price, quality, cleanliness, body, overallRating, priceRating, qualityRating, clenlinessRating, reviewBody } = this.state

    const toSend = {}
//setting rating stars
    if (overallRating !== overall && overallRating !== 0) {
      toSend.overall_rating = overallRating
    }
    if (priceRating !== price && priceRating !== 0) {
      toSend.price_rating = priceRating
    }
    if (qualityRating !== quality && qualityRating !== 0) {
      toSend.quality_rating = qualityRating
    }
    if (clenlinessRating !== cleanliness && clenlinessRating !== 0) {
      toSend.clenliness_rating = clenlinessRating
    }
    if (reviewBody !== body && reviewBody !== '') {
      toSend.review_body = reviewBody
    }

    await this.filter(reviewBody)
    if (this.state.block === true) {
      Alert.alert('Please refrain from mentioning any food/beverages other than coffee.')
      this.setState({ isLoading: false })
    }
    if (this.state.block === false) {
      const status = await reviewFetch.updateReview(locID, reviewID, toSend)
      if (hasPhoto) {
        this.updatePhoto()
      }
      this.handleReviewStatus(status)
    }
  }
//applying profanity filter
  filter (reviewBody) {
    const profFilter = this.state.profFilter
    profFilter.forEach(word => {
      if (reviewBody.includes(word)) {
        this.setState({ block: true })
      }
    })
  }

  async updatePhoto () {
    const navigation = this.props.navigation
    const { locID, reviewID, photo } = this.state
    const status = photoFetch.postPhoto(locID, reviewID, photo)
    if (status === 401) {
      navigation.navigate('Login')
    }
  }
//deleting review action
  async deleteReview () {
    const { locID, reviewID } = this.state
    const status = await reviewFetch.deleteReview(locID, reviewID)
    this.handleReviewStatus(status)
  }
//delete photo action
  async deletePhoto () {
    const { locID, reviewID } = this.state
    this.setState({ isLoading: true })
    const status = await photoFetch.deletePhoto(locID, reviewID)
    if (status === 200) {
      this.setState({ hasPhoto: false }, () => {
        this.setState({ isLoading: false })
      })
    }
  }
//this functions dictates what happens when you like a  review 
  async handleLikes () {
    const { locID, reviewID, isLiked } = this.state
    if (isLiked) {
      const status = await likeFetch.unlikeReview(locID, reviewID)
      const liked = false
      this.handleLikeStatus(status, liked)
    } else {
      const status = await likeFetch.likeReview(locID, reviewID)
      const liked = true
      this.handleLikeStatus(status, liked)
    }
  }
//handles user authentication
  handleReviewStatus (status) {
    const navigation = this.props.navigation
    if (status === 200) {
      navigation.navigate('My Reviews')
    }
    if (status === 401) {
      navigation.navigate('Login')
    }
    if (status === 404) {
      navigation.navigate('Logout')
    }
  }
//handles like status
  handleLikeStatus (status, liked) {
    const navigation = this.props.navigation
    if (status === 200) {
      this.setState({ isLiked: liked }, () => {
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
//displays A delete review alert when review is about to be deleted
  deleteAlert () {
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Delete',
          onPress: () => this.deleteReview()
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ],
      { cancelable: false }//cancels delete action
    )
  }
//render means sharing code between React components using a prop whose value is a function
  render () {
    const navigation = this.props.navigation
    const { isLoading, isMyReview, isLiked, hasPhoto, overall, price, quality, cleanliness, body, location, town, photo, base64Img } = this.state

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
    return (//returns review data for display
      <Block>
        <ScrollView>
          <Block
            middle
            style={styles.margin15}
          >
            {isMyReview
              ? <Block
                  row
                  middle
                  style={styles.myReviewContainer}
                >
                <Block
                  middle
                  style={styles.pRight50}
                >
                  <Text style={styles.locationNameText}>{location}</Text>
                  <Text style={styles.locationTownText}>{town}</Text>
                  <TouchableOpacity onPress={() => this.handleLikes()}>
                    {isLiked
                      ? <Icon size={30} name='heart' family='AntDesign' color='#FE5F55' />
                      : <Icon size={30} name='hearto' family='AntDesign' color='#FE5F55' />}
                  </TouchableOpacity>
                </Block>
                {hasPhoto
                  ? <Block row bottom>
                    <Image
                      style={styles.blockImage}
                      source={{ uri: base64Img }}
                    />
                    <TouchableOpacity onPress={() => this.deletePhoto()}>
                      <Icon size={22} name='delete' family='AntDesign' color='#FE5F55' />
                    </TouchableOpacity>
                    </Block>
                  : <TouchableOpacity onPress={() => navigation.navigate('Camera', { page: 'currentReview' })}>
                    <Block
                      middle style={styles.blockImageEmpty}
                    >
                      <Text style={styles.plusText}>+</Text>
                      <Text style={styles.addImageText}>Add Image</Text>
                    </Block>
                  </TouchableOpacity>}
                </Block>
              : <Block
                  middle
                  style={styles.myReviewContainer}
                >
                {hasPhoto
                  ? <Image
                      style={styles.bannerImage}
                      source={{ uri: base64Img }}
                    />
                  : <Block />}
                <Text style={styles.myReviewImageText}>{location}</Text>
                <Text style={styles.locationTownText}>{town}</Text>
                <TouchableOpacity onPress={() => this.handleLikes()}>
                  {isLiked
                    ? <Icon size={30} name='heart' family='AntDesign' color='#FE5F55' />
                    : <Icon size={30} name='hearto' family='AntDesign' color='#FE5F55' />}
                </TouchableOpacity>
                </Block>}
            <Block
              middle style={styles.ratingBlock}
            >
              <Text style={styles.ratingTitle}>Rating</Text>
              <Block
                row style={styles.padding10}
              >
                <Text style={styles.ratingText}>Overall</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={overall}
                  isDisabled={!isMyReview}
                  size={22}
                  selectedColor='#F5B700'
                  showRating={false}
                  starContainerStyle={{
                    alignItems: 'flex-start',
                    alignSelf: 'flex-start'
                  }}
                  onFinishRating={(overallRating) => this.setState({ overallRating })}
                />
              </Block>
              <Block
                row style={styles.padding5}
              >
                <Text style={styles.ratingText}>Price</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={price}
                  isDisabled={!isMyReview}
                  size={22}
                  selectedColor='#F5B700'
                  showRating={false}
                  starContainerStyle={{
                    alignItems: 'flex-start',
                    alignSelf: 'flex-start'
                  }}
                  onFinishRating={(priceRating) => this.setState({ priceRating })}
                />
              </Block>
              <Block
                row style={styles.padding5}
              >
                <Text style={styles.ratingText}>Quality</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={quality}
                  isDisabled={!isMyReview}
                  size={22}
                  selectedColor='#F5B700'
                  showRating={false}
                  starContainerStyle={{
                    alignItems: 'flex-start',
                    alignSelf: 'flex-start'
                  }}
                  onFinishRating={(qualityRating) => this.setState({ qualityRating })}
                />
              </Block>
              <Block
                row style={styles.ratingBottomBlock}
              >
                <Text style={styles.ratingText}>Cleanliness</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={cleanliness}
                  isDisabled={!isMyReview}
                  size={22}
                  selectedColor='#F5B700'
                  showRating={false}
                  starContainerStyle={{
                    alignItems: 'flex-start',
                    alignSelf: 'flex-start'
                  }}
                  onFinishRating={(clenlinessRating) => this.setState({ clenlinessRating })}
                />
              </Block>
            </Block>
            <Block
              middle style={styles.reviewBlock}
            >
              <Text style={styles.reviewTitle}>Review</Text>
              {isMyReview
                ? <Block>
                  <Text style={styles.reviewSubTitle}>Please comment on your overall experience at {location}, {town}.</Text>
                  <Input
                    rounded
                    placeholder={body}
                    style={styles.reviewInput}
                    placeholderTextColor='#001D4A'
                    onChangeText={(reviewBody) => this.setState({ reviewBody })}
                    value={this.state.review_body}
                  />
                  <Block middle>
                    <Button
                      round
                      size='small'
                      color='#FE5F55'
                      style={styles.reviewBtn}
                      onPress={() => this.updateReview()}
                    >
                      Update Review
                    </Button>
                    <TouchableOpacity onPress={() => this.deleteAlert()}>
                      <Icon size={30} name='delete' family='AntDesign' color='#FE5F55' />
                    </TouchableOpacity>
                  </Block>
                  </Block>
                : <Text style={styles.reviewSubTitle}>"{body}"</Text>}
            </Block>
          </Block>
        </ScrollView>
      </Block>
    )
  }
}

export default Review