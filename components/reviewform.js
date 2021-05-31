import React, { Component } from 'react'
import { Text, ActivityIndicator, ScrollView, Image, Alert } from 'react-native'
import { Block, Button, Input } from 'galio-framework'
import { AirbnbRating } from 'react-native-ratings'
import { TouchableOpacity } from 'react-native-gesture-handler'
import reviewFetch from '../api/review'
import userFetch from '../api/user'
import photoFetch from '../api/photo'
import profFilter from '../components/profanity-filter.json'
import styles from '../css/styles'

class NewReview extends Component {
  constructor (props) { //a method used to initialize an object's state in a NumReview class
    super(props)
    this.state = {
      profFilter: profFilter.profWords,
      block: false,
      locID: '',
      location: '',
      town: '',
      photo: '',
      uriPhoto: '',
      isLoading: true,
      hasPhoto: false,
      overallRating: 0,
      priceRating: 0,
      qualityRating: 0,
      clenlinessRating: 0,
      reviewBody: ''
    }
  }
//async allows us to fetch data in our React application
  async componentDidMount () {
    const { navigation, route } = this.props
    const { locID, location, town, photo } = route.params
    this.setState({ block: false })
    this.unmount = navigation.addListener('focus', () => {
      this.componentDidMount()
    })
    if (photo === null) {
      this.setState({
        isLoading: false,
        hasPhoto: false,
        locID: locID,
        location: location,
        town: town
      })
    }
    if (photo !== null) {
      this.setState({ isLoading: true, photo: photo }, () => {
        this.checkForPhoto(photo)
      })
    }
  }

  componentWillUnmount () {
    this.unmount()
  }

  checkForPhoto (photo) {
    const uriPhoto = photo.uri
    console.log('PHOTO URI - ' + uriPhoto)
    this.setState({ hasPhoto: true, uriPhoto: uriPhoto }, () => {
      this.setState({ isLoading: false })
    })
  }
//fetchs added reviews from users
  async addReview () {
    this.setState({ isLoading: true, block: false })
    const navigation = this.props.navigation
    const { locID, overallRating, priceRating, qualityRating, clenlinessRating, reviewBody } = this.state
    await this.filter(reviewBody)
    if (this.state.block === true) {
      Alert.alert('Please refrain from mentioning any food/beverages other than coffee.')
      this.setState({ isLoading: false })
    }
    if (this.state.block === false) {
      const response = await reviewFetch.addReview(locID, overallRating, priceRating, qualityRating, clenlinessRating, reviewBody)
      if (response === 201) {
        this.addPhoto(locID, reviewBody)
        navigation.navigate('Home')
      }
      if (response === 401) {
        navigation.navigate('Login')
      }
      if (response === 404) {
        navigation.navigate('Logout')
      }
    }
  }
//filters out reviews with profanity words  
  filter (reviewBody) {
    const profFilter = this.state.profFilter
    profFilter.forEach(word => {
      if (reviewBody.includes(word)) {
        this.setState({ block: true })
      }
    })
  }
//adds photo to review body
  async addPhoto (locID, reviewBody) {
    const navigation = this.props.navigation
    const revID = await userFetch.getReviewID(reviewBody)
    const photo = this.state.photo
    const response = await photoFetch.postPhoto(locID, revID, photo)
    if (response === 401) {
      navigation.navigate('Login')
    }
  }

  render () {
    const { isLoading, hasPhoto, uriPhoto, location, town } = this.state
    const navigation = this.props.navigation

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
          <Block
            middle
            style={styles.margin15}
          >
            <Block
              row
              middle
              style={styles.newReviewContainer}
            >
              <Block
                middle
                style={styles.pRight50}
              >
                <Text style={styles.locationNameText}>{location}</Text>
                <Text style={styles.locationTownText}>{town}</Text>
              </Block>
              {hasPhoto
                ? <TouchableOpacity onPress={() => navigation.navigate('Camera', { page: 'newForm' })}>
                  <Image
                    style={styles.blockImage}
                    source={{ uri: uriPhoto }}
                  />
                  </TouchableOpacity>
                : <TouchableOpacity onPress={() => navigation.navigate('Camera', { page: 'newForm' })}>
                  <Block
                    middle style={styles.blockImageEmpty}
                  >
                    <Text style={styles.plusText}>+</Text>
                    <Text style={styles.addImageText}>Add Image</Text>
                  </Block>
                  </TouchableOpacity>}
            </Block>
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
                  defaultRating={0}
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
                  defaultRating={0}
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
                  defaultRating={0}
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
                  defaultRating={0}
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
              <Text style={styles.reviewSubTitle}>Please comment on your overall experience at {location}, {town}.</Text>
              <Input
                rounded
                style={styles.reviewInput}
                placeholderTextColor='#001D4A'
                onChangeText={(reviewBody) => this.setState({ reviewBody })}
                value={this.state.reviewBody}
              />
              <Button
                round
                size='small'
                color='#FE5F55'
                style={styles.reviewBtn}
                onPress={() => this.addReview()}
              >
                Post Review
              </Button>
            </Block>
          </Block>
        </ScrollView>
      </Block>
    )
  }
}

export default NewReview