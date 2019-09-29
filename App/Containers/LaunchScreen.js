import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Images } from '../Themes'
import { sleep } from '../utils/utils'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation';
import UserActions from '../Redux/UserRedux'

// Styles
import styles from './Styles/LaunchScreenStyles'

class LaunchScreen extends Component {
  static navigationOptions = () => {
    return {
      header: () => null
    }
  }

  async componentDidMount() {
    await sleep(1000)
    const { status, userId } = this.props
    if (Boolean(status)) {
      this.props.navigate('App');
    } else {
      this.props.navigate('Auth');
    }
    if (Boolean(userId)) {
      this.props.getUserInfo({ userId })
    }
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Image source={Images.ready} />
            <Text style={styles.sectionText}>
              This probably isn't what your app is going to look like. Unless your designer handed you this screen and, in that case, congrats! You're ready to ship. For everyone else, this is where you'll see a live preview of your fully functioning app using Ignite.
            </Text>
          </View>

        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    user: { status, userId }
  } = state;
  return { status, userId };
}

const mapDispatchToProps = (dispatch) => ({
  navigate: (route) => dispatch(NavigationActions.navigate({ routeName: route })),
  getUserInfo: (params) => dispatch(UserActions.getUserInfo(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
