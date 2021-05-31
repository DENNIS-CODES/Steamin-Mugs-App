import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

  // main
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ratingBlock: {
    width: 320,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#697177'
  },
  coffidaBanner: {
    width: 40,
    height: 40
  },
  bannerImage: {
    width: 370,
    height: 190,
    borderRadius: 3
  },
  blockImage: {
    width: 130,
    height: 100,
    borderRadius: 3
  },
  blockImageEmpty: {
    width: 130,
    height: 100,
    borderWidth: 1,
    borderColor: '#7B8CDE'
  },
  cardImage: {
    width: 370,
    height: 190,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3
  },
  thumbnail: {
    width: 60,
    height: 60
  },
  headerIcon: {
    width: 80,
    height: 80
  },
  largeHeaderIcon: {
    width: 90,
    height: 90
  },
  ratingBottomBlock: {
    padding: 5,
    paddingBottom: 10
  },
  reviewBlock: {
    width: 320,
    padding: 10
  },
  reviewBlock2: {
    width: 320,
    paddingBottom: 20
  },
  margin15: {
    margin: 15
  },
  mLeft10: {
    marginLeft: 10
  },
  mRight10: {
    marginRight: 10
  },
  mTop5: {
    marginTop: 5
  },
  mBottom10: {
    marginBottom: 10
  },
  padding5: {
    padding: 5
  },
  padding10: {
    padding: 10
  },
  pHorizontal15: {
    paddingHorizontal: 15
  },
  pHorizontal10: {
    paddingHorizontal: 10
  },
  pRight15: {
    paddingRight: 15
  },
  pRight50: {
    paddingRight: 50
  },
  pRight120: {
    paddingRight: 120
  },
  pLeft10: {
    paddingLeft: 10
  },
  pLeft15: {
    paddingLeft: 15
  },
  pLeft120: {
    paddingLeft: 120
  },
  pTop5: {
    paddingTop: 5
  },
  pTop10: {
    paddingTop: 10
  },
  pTop20: {
    paddingTop: 20
  },
  pTop40: {
    paddingTop: 40
  },
  pBottom5: {
    paddingBottom: 5
  },
  pBottom10: {
    paddingBottom: 10
  },
  text18: {
    fontSize: 18
  },
  text19: {
    fontSize: 19
  },
  noDataText: {
    textAlign: 'center',
    color: '#000000'
  },
  locationNameText: {
    fontSize: 25,
    color: '#001D4A'
  },
  locationTownText: {
    fontSize: 18,
    color: '#697177',
    paddingBottom: 5
  },
  distanceText: {
    paddingLeft: 6,
    fontSize: 13,
    color: '#7B8CDE'
  },
  plusText: {
    fontSize: 20,
    color: '#7B8CDE'
  },
  addImageText: {
    fontSize: 14,
    color: '#7B8CDE'
  },
  ratingTitle: {
    fontSize: 20,
    color: '#001D4A'
  },
  ratingText: {
    fontSize: 16,
    paddingRight: 6
  },
  reviewCardBody: {
    fontSize: 14,
    color: '#FE5F55',
    textAlign: 'center'
  },
  reviewCardLikes: {
    fontSize: 14,
    color: '#FE5F55'
  },
  reviewTitle: {
    fontSize: 20,
    color: '#001D4A',
    paddingBottom: 10
  },
  reviewSubTitle: {
    fontSize: 14,
    color: '#697177',
    paddingBottom: 10,
    textAlign: 'center'
  },
  reviewInput: {
    borderColor: '#7B8CDE',
    borderWidth: 2,
    backgroundColor: '#F2F2F2',
    elevation: 3,
    height: 80
  },
  textInput: {
    borderColor: '#7B8CDE',
    borderWidth: 2,
    backgroundColor: '#F2F2F2',
    elevation: 3
  },
  reviewBtn: {
    elevation: 4,
    marginTop: 20
  },
  writeReviewBtn: {
    elevation: 4,
    marginTop: 10
  },
  mainBtn: {
    elevation: 4,
    marginTop: 20
  },
  elevation4: {
    elevation: 4
  },

  // homescreen
  homeContainer: {
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 5
  },
  homeCard: {
    flexDirection: 'column',
    borderColor: 'transparent',
    marginHorizontal: 20,
    marginVertical: 12,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    shadowOpacity: 0.40,
    elevation: 4
  },
  homeCardText: {
    fontSize: 15,
    color: '#697177'
  },

  // loginscreens / logoutscreen / signupscreen
  loginContainer: {
    marginHorizontal: 60,
    padding: 10,
    marginTop: 100
  },
  signUpContainer: {
    marginHorizontal: 60,
    padding: 10,
    marginTop: 50
  },
  loginImg: {
    width: 80,
    height: 80,
    marginBottom: 20
  },
  accountText: {
    fontSize: 14,
    marginTop: 15,
    textAlign: 'center',
    color: '#697177'
  },
  logoutText: {
    fontSize: 30,
    marginBottom: 10,
    color: '#001D4A'
  },

  // search
  searchContainer: {
    marginHorizontal: 40,
    marginTop: 5
  },
  searchRatingsText: {
    fontSize: 1b,
    color: '#001D4A',
    paddingTop: 10,
    paddingBottom: 5
  },
  searchOnlyText: {
    fontSize: 15,
    marginBottom: 5,
    textAlign: 'center'
  },
  paginationArrows: {
    width: 30,
    height: 20
  },
  searchCardContainer: {
    flexDirection: 'column',
    borderColor: 'transparent',
    marginHorizontal: 20,
    marginVertical: 12,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    shadowOpacity: 0.40,
    elevation: 4
  },
  searchCardText: {
    fontSize: 15,
    color: '#697177'
  },

  // shop
  shopContainer: {
    width: 320,
    margin: 10,
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#697177'
  },
  shopText: {
    fontSize: 19,
    color: '#697177'
  },
  shopDistanceText: {
    paddingLeft: 4,
    fontSize: 16,
    color: '#697177'
  },
  reviewCard: {
    borderColor: 'transparent',
    marginVertical: 16 / 2,
    padding: 16,
    backgroundColor: '#FFFFFF',
    shadowOpacity: 0.40,
    elevation: 4
  },

  // current review
  myReviewContainer: {
    width: 340,
    margin: 10,
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#697177'
  },
  myReviewImageText: {
    fontSize: 25,
    color: '#001D4A',
    paddingTop: 15
  },

  // review form
  newReviewContainer: {
    width: 320,
    margin: 10,
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#697177'
  },

  // account
  accountTitle: {
    fontSize: 30,
    marginBottom: 10,
    color: '#001D4A'
  },
  accountSubTitle: {
    fontSize: 14,
    marginBottom: 20,
    marginHorizontal: 20,
    textAlign: 'center',
    color: '#697177'
  },
  accountContainer: {
    marginHorizontal: 60,
    padding: 10
  },

  // my reviews
  myReviewsCard: {
    borderColor: 'transparent',
    marginHorizontal: 16,
    marginVertical: 16 / 2,
    padding: 16,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    shadowOpacity: 0.40,
    elevation: 4
  },
  myReviewsCardText: {
    fontSize: 15,
    color: '#697177'
  },
  editText: {
    fontSize: 13,
    color: '#7B8CDE'
  },

  // liked reviews
  likedReviewsCard: {
    borderColor: 'transparent',
    marginHorizontal: 16,
    marginVertical: 16 / 2,
    padding: 16,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    shadowOpacity: 0.40,
    elevation: 4
  },
  likedCardText: {
    fontSize: 15,
    color: '#697177'
  },

  // favourite shops
  favouriteCard: {
    flexDirection: 'column',
    borderColor: 'transparent',
    marginHorizontal: 20,
    marginVertical: 12,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    shadowOpacity: 0.40,
    elevation: 4
  },
  favouriteCardText: {
    fontSize: 15,
    color: '#697177'
  },

  // camera
  cameraStyle: {
    flex: 1,
    width: '100%',
    alignItems: 'center'
  },
  cameraHiddenText: {
    color: '#F2F2F2'
  }

})

export default styles