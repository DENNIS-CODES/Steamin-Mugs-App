import React, { Component } from 'react'
import { RNCamera } from 'react-native-camera'
import { Block, Icon, Text } from 'galio-framework'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as ImagePicker from 'react-native-image-picker'
import styles from '../css/styles'
/* class components This gives the class App access to the React lifecycle methods
 like render as well as state/props */
class Camera extends Component {
  constructor (props) {
    super(props)
    this.state = {
      photo: '',
      page: ''
    }
  }

  componentDidMount () {
    const { route } = this.props
    const { page } = route.params
    this.setState({ photo: '', page: page })
  }
//asnyc is placed infront of a function declaration to turn it into an async function
  async takePhoto () {
    const navigation = this.props.navigation
    const page = this.state.page
    if (this.camera) {
      const options = { quality: 0.5, base64: true }
      const data = await this.camera.takePictureAsync(options)
      if (page === 'newForm') {
        navigation.navigate('ReviewForm', { locID: null, location: '', town: '', photo: data })
      } else if (page === 'currentReview') {
        navigation.navigate('Review', { reviewID: null, overall: null, price: null, quality: null, cleanliness: null, body: '', locID: null, location: '', town: '', photo: data })
      } else {
        navigation.navigate('Home')
      }
    }
  }
//selecting images
  chooseImage () {
    const navigation = this.props.navigation
    const page = this.state.page
    const options = {
      title: 'Select Image',
      includeBase64: true,
      mediaType: 'photo'
    }
    //launch imagelibraries
    ImagePicker.launchImageLibrary(options, response => {
      const data = response
      if (page === 'newForm') {
        navigation.navigate('ReviewForm', { locID: null, location: '', town: '', photo: data })
      } else if (page === 'currentReview') {
        navigation.navigate('Review', { reviewID: null, overall: null, price: null, quality: null, cleanliness: null, body: '', locID: null, location: '', town: '', photo: data })
      } else {
        navigation.navigate('Home')
      }
    })
  }
 // A component with a render prop takes a function that returns a React element and calls it instead of implementing its own render logic.
  render () {
    return (
      <Block flex>
        <RNCamera
          ref={ref => {
            this.camera = ref
          }}
          style={styles.cameraStyle}
          captureAudio={false}
          //userpermission
          androidCameraPermissionOptions={{
            title: 'Allow CoffiDa to take pictures?',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Allow',
            buttonNegative: 'Cancel'
          }}
        />
        <Block row middle space='between'>
          <Block row style={styles.mLeft10}>
            <Icon size={20} name='plus' family='AntDesign' color='#F2F2F2' />
            <Text style={styles.cameraHiddenText}>Gallery</Text>
          </Block>
          <Block>
            <TouchableOpacity onPress={() => this.takePhoto()}>
              <Icon size={50} name='camerao' family='AntDesign' color='#7B8CDE' />
            </TouchableOpacity>
          </Block>
          <TouchableOpacity onPress={() => this.chooseImage()}>
            <Block right row style={styles.mRight10}>
              <Icon size={20} name='plus' family='AntDesign' color='#7B8CDE' />
              <Text>Gallery</Text>
            </Block>
          </TouchableOpacity>
        </Block>
      </Block>

    )
  }
}
export default Camera