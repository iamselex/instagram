import React, {Component} from 'react';
import {Text, View, ImageBackground, Image,  StatusBar, ScrollView, Linking  } from 'react-native';
import LoginButton from './src/components/LoginButton';
import TappableText from './src/components/TappableText';
import Dimensions from 'Dimensions';

const windowSize = Dimensions.get('window')
const standardComponentWidth = windowSize.width * 0.82;


const colors = {
  facebook: 'rgb(59, 89,152)',
  text: 'rgba(255,  255, 255, 0.75)',
  instagramButtomBorderColor: 'rgba(255, 255, 255, 0.35)',
  facebookButtomBorderColor: 'rgba(255, 255, 255, 0.35)'
}

const loginButtonInfo = {
  height: 45,
  pageFontSize: 11,
  borderWidth: 0.8,
  borderRadius: 5
}

const urls = {
  forgotInstagramLogin: 'https://www.instagram.com/accounts/password/reset',
  twitterLogin: 'https://twitter.com/login?lang=en',
  instagramSignUp: 'https://www.instagram.com/accounts/emailsignup/?hl=en',
  instagramAuthLogin: 'https://api.instagram.com/oauth/authorize/?client_id=cda6dee7d8164a868150910407962f52&redirect_uri=http://www.kaitechconsulting.com&response_type=token&scope=basic+follower_list+comments+likes',
  instagramLogout: 'https://instagram.com/accounts/logout',
  instagramBase: 'https://www.instagram.com/',
}

export default class App extends Component {

  constructor(props){
    super(props);
  }

  loginButtonPressed = () => {
    console.log('Button was pressed by OGA BOSS');
  }

  loginScreenComponent = () => {

    return(
      <ImageBackground
        source={require('./src/images/one.jpg')}
        resizeMode={'cover'}
        style={viewStyles.container}
      >

          <StatusBar
            backgroundColor="blue"
            barStyle="light-content"
          />

          <ScrollView>

            <Image
              source={require('./src/images/instagram-text-logo.png')}
              style={viewStyles.instagramTextLogo}
              resizeMode={'contain'}
            />

            <LoginButton
              buttonViewStyle={viewStyles.instagramLoginButtonView}
              buttonTextStyle={{color: colors.text, fontWeight: '500'}}
              buttonTapped={this.loginButtonPressed}
              touchableHighlightStyle= {viewStyles.instagramButtonTouchableHighglightStyle}
              activeOpacity={0.75}
            >
              log In (Via instagram)
            </LoginButton>

            <LoginButton
              buttonViewStyle={[viewStyles.instagramLoginButtonView,viewStyles.facebookLoginButtonView]}
              buttonTextStyle={{color: colors.text, fontWeight: '500'}}
              buttonTapped={this.loginButtonPressed}
              touchableHighlightStyle= {[viewStyles.instagramButtonTouchableHighglightStyle, viewStyles.facebookButtonTouchableHightlightStyle]}
              activeOpacity={0.75}
            >
              Facebook login
            </LoginButton>


            <View style={viewStyles.forgottenLoginEncapsulationView}>
              <Text style= {textStyles.forgottenLogin}>Forgot your login details?</Text>
              <TappableText
                textStyle={[textStyles.forgottenLogin,textStyles.forgottenLoginBold]}
                textTapped={() => Linking.openURL(urls.forgotInstagramLogin)}
              >
                Get help signing in
              </TappableText>

              </View>

              <View style={viewStyles.orSeparatorView}>
                <View style={viewStyles.orSeparatorLine}/>

                <Text style={textStyles.orSeparatorTextStyle}>OR</Text>

                <View style={viewStyles.orSeparatorLine}/>

              </View>

              </ScrollView>

        </ImageBackground>

      );
    }

//[1,2,3,3]

  render() {
    return (
      this.loginScreenComponent()
    );
  }

}

const viewStyles = {
  container:{
    flex: 1,
    alignItems: 'center',
  },
  instagramTextLogo: {
    width: 150,
    height: 80,
    marginTop: '50%',
    marginBottom:25,
    alignSelf: 'center'
  },
  instagramLoginButtonView:{
    backgroundColor: 'transparent',
    borderColor: colors.instagramButtomBorderColor,
    borderWidth: loginButtonInfo.borderWidth,
    borderRadius: loginButtonInfo.borderRadius,
    width: standardComponentWidth,
    height: loginButtonInfo.height,
    justifyContent: 'center',
    alignItems: 'center'
  },
    instagramButtonTouchableHighglightStyle: {
      backgroundColor: 'transparent',
      width: standardComponentWidth,
      height: loginButtonInfo.height,
      marginTop: 5
    },
    facebookButtonTouchableHightlightStyle: {
      marginTop: 20,
      marginBottom: 10
    },
    facebookLoginButtonView: {
      backgroundColor: colors.facebook
    },
    forgottenLoginEncapsulationView: {
      flexDirection: 'row',
      flex: 1,
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent'

    },
    orSeparatorView: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: 'white',
      marginTop: 10,
      paddingHorizontal :5
    },
    orSeparatorLine: {
      height: 1,
      flex: 5,
      backgroundColor: colors.instagramButtomBorderColor,
      borderColor: colors.instagramButtomBorderColor,
      borderWidth: 0.5,
      marginHorizontal: 5
    }
};

const textStyles={

  forgottenLogin: {
    color: 'white',
    fontSize: loginButtonInfo.pageFontSize,
    backgroundColor: 'transparent'
  },
  forgottenLoginBold: {
    fontWeight: 'bold',
    marginLeft: 3
  },
  orSeparatorTextStyle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    fontSize: 13

  }

};
