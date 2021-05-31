import React, { Component } from 'react'
import { Text, TouchableOpacity, Image } from 'react-native'
import { Block, Button, Input, Radio, Icon } from 'galio-framework'
import { ScrollView } from 'react-native-gesture-handler'
import { AirbnbRating } from 'react-native-ratings'
import Geolocation from 'react-native-geolocation-service'
import haversine from 'haversine'
import search from '../api/search'
import styles from '../css/styles'

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchResults: [],
      distances: {},
      shopName: '',
      overallRating: 0,
      priceRating: 0,
      qualityRating: 0,
      clenlinessRating: 0,
      radio1: false,
      radio2: false,
      favourites: '',
      myReviews: '',
      offset: 0
    }
  }

  componentDidMount () {
    this.setState({
      radio1: false,
      radio2: false,
      searchResults: [],
      offset: 0
    })
  }

  handleRadio1 () {
    const radio1 = this.state.radio1
    this.setState({ radio1: !radio1 }, () => {
      if (this.state.radio1) {
        this.setState({ favourites: 'favourite' })
      }
      if (!this.state.radio1) {
        this.setState({ favourites: '' })
      }
    })
  }

  handleRadio2 () {
    const radio2 = this.state.radio2
    this.setState({ radio2: !radio2 }, () => {
      if (this.state.radio2) {
        this.setState({ myReviews: 'reviewed' })
      }
      if (!this.state.radio2) {
        this.setState({ myReviews: '' })
      }
    })
  }

  resetSearch () {
    this.setState({ offset: 0, searchResults: [] }, () => {
      this.handleSearch()
    })
  }

  resetBack () {
    if (this.state.offset > 0) {
      this.setState({ searchResults: [], offset: this.state.offset - 1 }, () => {
        this.handleBack()
      })
    }
  }

  resetNext () {
    this.setState({ searchResults: [], offset: this.state.offset + 1 }, () => {
      this.handleNext()
    })
  }
//handling serach actions
  async handleSearch () {
    const { shopName, overallRating, priceRating, qualityRating, clenlinessRating, favourites, myReviews, offset } = this.state

    const results = await search.findLocations(shopName, overallRating, priceRating, qualityRating, clenlinessRating, favourites, myReviews, offset)
    this.setState({ searchResults: results }, () => {
      this.getDistance()
    })
  }

  async handleBack () {
    const { shopName, overallRating, priceRating, qualityRating, clenlinessRating, favourites, myReviews, offset } = this.state
    const results = await search.findLocations(shopName, overallRating, priceRating, qualityRating, clenlinessRating, favourites, myReviews, offset)
    this.setState({ searchResults: results }, () => {
      this.getDistance()
    })
  }

  async handleNext () {
    const { shopName, overallRating, priceRating, qualityRating, clenlinessRating, favourites, myReviews, offset } = this.state
    const results = await search.findLocations(shopName, overallRating, priceRating, qualityRating, clenlinessRating, favourites, myReviews, offset)
    this.setState({ searchResults: results }, () => {
      this.getDistance()
    })
  }
//gettingg user distance
  getDistance () {
    const { searchResults } = this.state
    if (searchResults.length > 0) {
      Geolocation.getCurrentPosition(
        async (position) => {
          const start = { latitude: position.coords.latitude, longitude: position.coords.longitude }
          const end = { latitude: searchResults[0].latitude, longitude: searchResults[0].longitude }
          const distance = Math.round(haversine(start, end))
          this.setState({ distances: { location: searchResults[0].location_id, distance: distance } })
        },
        (error) => {
          console.log(error)
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      )
    }
  }

  render () {
    const navigation = this.props.navigation
    const { searchResults, distances } = this.state

    const imagePaths = [
      {
        uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613053623/MobileApp/pexels-igor-starkov-1002740_jqapwj.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613053629/MobileApp/pexels-quark-studio-2506993_jhagmt.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613053643/MobileApp/pexels-lisa-fotios-1024359_oiqien.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613053619/MobileApp/pexels-lisa-fotios-1995010_khjtql.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613053634/MobileApp/pexels-anna-tukhfatullina-food-photographerstylist-2551794_mxzjzw.jpg'
      }
    ]

    return (
      <Block>
        <ScrollView>
          <Block
            middle
            style={styles.searchContainer}
          >
            <Input
              rounded
              placeholder='Shop Name'
              style={styles.textInput}
              icon='search1'
              family='antdesign'
              iconColor='#001D4A'
              right
              placeholderTextColor='#001D4A'
              onChangeText={(shopName) => this.setState({ shopName })}
              value={this.state.shopName}
            />
            <Text style={styles.searchRatingsText}>Minimum Ratings</Text>
            <Block row>
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
            <Block row>
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
            <Block row>
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
              row style={styles.pBottom5}
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
            <Block middle style={styles.pTop5}>
              <Text style={styles.searchOnlyText}>Search Only:</Text>
              <Block row style={styles.pBottom10}>
                <Block style={styles.pRight15}>
                  <Radio label='Favourite Shops' color='#7B8CDE' onChange={() => this.handleRadio1()} />
                </Block>
                <Block style={styles.pRight15}>
                  <Radio label='My Reviews' color='#7B8CDE' onChange={() => this.handleRadio2()} />
                </Block>
              </Block>
            </Block>
            <Button
              round
              size='small'
              color='#7B8CDE'
              style={styles.elevation4}
              onPress={() => this.resetSearch()}
            >
              Search
            </Button>
          </Block>
          <Block>
            {searchResults && searchResults.map((data, index) => (
              <Block key={index}>
                <Block row middle>
                  <TouchableOpacity style={styles.pRight120} onPress={() => this.resetBack()}>
                    <Image
                      style={styles.paginationArrows}
                      source={{ uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1614009486/MobileApp/back_trl21g.png' }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.pLeft120} onPress={() => this.resetNext()}>
                    <Image
                      style={styles.paginationArrows}
                      source={{ uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1614009489/MobileApp/next_jg0z6u.png' }}
                    />
                  </TouchableOpacity>
                </Block>
                <Block
                  center card shadow space='between' style={styles.searchCardContainer}
                >
                  <TouchableOpacity onPress={() => navigation.navigate('Shop', { locID: data.location_id, path: imagePaths[index].uri, distance: distances.distance })}>
                    <Block>
                      <Block
                        row
                        center
                        style={styles.mBottom10}
                      >
                        <Image
                          style={styles.cardImage}
                          source={{ uri: imagePaths[index].uri }}
                        />
                      </Block>
                      <Block
                        row
                        center
                        style={styles.pHorizontal15}
                      >
                        <Image
                          style={styles.thumbnail}
                          source={{ uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1612974814/MobileApp/restaurant_zusegh.png' }}
                        />
                        <Block flex style={styles.pLeft15}>
                          <AirbnbRating
                            count={5}
                            defaultRating={data.avg_overall_rating}
                            size={20}
                            selectedColor='#06D6A0'
                            isDisabled
                            showRating={false}
                            starContainerStyle={{
                              alignItems: 'flex-start',
                              alignSelf: 'flex-start'
                            }}
                          />
                          <Text style={styles.text19}>{data.location_name}</Text>
                          <Text style={styles.searchCardText}>{data.location_town}</Text>

                        </Block>
                        <Block row>
                          <Icon size={18} name='enviroment' family='AntDesign' color='#7B8CDE' />
                          <Text style={styles.distanceText}>{distances.distance} Km</Text>
                        </Block>
                      </Block>
                    </Block>
                  </TouchableOpacity>
                </Block>
              </Block>
            ))}
          </Block>
        </ScrollView>
      </Block>
    )
  }
}

export default Search