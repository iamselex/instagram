import React, {Component} from 'react';
import {Text, View, ImageBackground, Image,  StatusBar, ScrollView, Linking, WebView   } from 'react-native';
import LoginButton from './src/components/LoginButton';
import TappableText from './src/components/TappableText';
import InstaNavigationBar from './src/components/InstaNavigationBar';
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
  instagramAuthLogin: 'https://api.instagram.com/oauth/authorize/?client_id=0f4d5ad2bb554ff7b2078f2752828616&redirect_uri=http://kaitechconsulting.com&response_type=token&scope=basic+follower_list+comments+likes',
  instagramLogout: 'https://instagram.com/accounts/logout',
  instagramBase: 'https://www.instagram.com/',
}

export default class App extends Component {

  constructor(props){

    super(props);

    this.state = {
      authenticationURL: urls.instagramAuthLogin,
      accessToken: '',
      displayAuthenticationWebView: false
    }
  }

  loginButtonPressed = () => {
    //this function is excuted wen either of the login buttons re pressed
    this.setState({displayAuthenticationWebView: true});
  }


  onURLStateChange = (webViewState) => {
    //this function is called everytime the URL in thr browser changes

    const accessTokenSubString = 'access_token=';
    console.log('current URL =' + webViewState.url);

    //if the current url contains the substrings 'access_token' then extract the access_token
    if(webViewState.url .includes(accessTokenSubString) ){

      //safegaurd conditional (if) statement
    if(this.state.accessToken.length < 1){

      //the index of the begining of the access token
      var startIndexofAccessToken = webViewState.url.lastIndexOf(accessTokenSubString) + accessTokenSubString.length;
      var foundAccessToken = webViewState.url.substr(startIndexofAccessToken);

      this.setState({accessToken: foundAccessToken, });
    }


    }


  }

  displayAuthenticationWebViewComponent = () => {
    return (
      <WebView
        source={{ uri: this.state.authenticationURL }}
        startInLoadingState={true}
        onNavigationStateChange={this.onURLStateChange}

      />
    );
  }
  instagramFeedsScreenComponent = () => {
      return (
        <View style={{flex: 1}}>
          <InstaNavigationBar />
        </View>
      );
  }


  loginWithTwitterComponent = () =>{
    return(
      <View style={viewStyles.twitterLoginViewStyle}>
      <Image
        source={require('./src/images/icons/twitter_bird.png')}
        style={viewStyles.twitterIcon}
        resizeMode={'contain'}
      />
      <TappableText
        textStyle={[textStyles.forgottenLogin,textStyles.forgottenLoginBold]}
        textTapped={() => Linking.openURL(urls.twitterLogin)}
      >
        Get help signing in with twitter

      </TappableText>

      </View>
    );
  }

  signUpFooterComponent = () => {
    return(
      <View style={[viewStyles.forgottenLoginEncapsulationView, viewStyles.signUpFooterComponent]}>
        <Text style= {textStyles.forgottenLogin}>Dont have an account?</Text>

        <TappableText
          textStyle={[textStyles.forgottenLogin,textStyles.forgottenLoginBold]}
          textTapped={() => Linking.openURL(urls.instagramSignUp)}
        >
          Sign up

        </TappableText>

      </View>
    )
  }
  loginScreenComponent = () => {

    return(
      <ImageBackground
        source={require('./src/images/two.jpg')}
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

                {this.loginWithTwitterComponent()}

              </ScrollView>

              {this.signUpFooterComponent()}

        </ImageBackground>

      );
    }

  render() {

        var hasSuccesfullyLoggedIn = (this.state.accessToken.length > 1);
        var shouldDisplayeLoginScreen = (this.state.displayAuthenticationWebView == false && this.state.displayAuthenticationWebView <1);


          if(shouldDisplayeLoginScreen) {
            return (
              this.loginScreenComponent()
          );

        }

        else if(hasSuccesfullyLoggedIn) {
          return(
            this.instagramFeedsScreenComponent()
          );

        }
        else if (this.state.displayAuthenticationWebView == true) {
          return(
            this.displayAuthenticationWebViewComponent()
        );
      }

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
      marginVertical: 14,
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

    },
    twitterLoginViewStyle:{
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
      justifyContent: "center"
    },
    twitterIcon:{
      width: 17,
      height: 17,
      marginHorizontal: 4
    },
    signUpFooterComponent: {
      flex: 0.35,
      backgroundColor: 'rgba(255,255,255,0.15)',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.15)',
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 5.5},
      height: null,
      width: windowSize.width
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

  },
  twitterLogin: {
    fontSize: 20


  }

};
