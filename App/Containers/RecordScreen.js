import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import Simple from 'react-native-vector-icons/SimpleLineIcons';
import { Metrics } from '../Themes';
import I18n from '../I18n'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/RecordScreenStyle'

class RecordScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title:I18n.t('RecordTitle'),
      tabBarLabel: navigation.getParam('tabBarLabel'),
      tabBarIcon: ({ tintColor }) => (
        <Simple name={'notebook'}
          size={Metrics.tabIconSize}
          color={tintColor}
        />
      )
    }
  }

  componentDidMount = () => {
    this._updateText();
  }

  _updateText= ()=>{
    this.props.navigation.setParams({
      tabBarLabel: I18n.t('RecordTab')
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>RecordScreen</Text>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordScreen)
