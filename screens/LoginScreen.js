import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Platform, Image,AsyncStorage,Alert,ScrollView ,Clipboard,ToastAndroid,Dimensions,FlatList,BackHandler,TextInput,KeyboardAvoidingView,Keyboard,StatusBar} from 'react-native';
import { Icon } from "react-native-elements";
import { withNavigation,NavigationActions } from 'react-navigation';
import { Card } from 'react-native-elements';
import { withNavigationFocus } from 'react-navigation';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, login, getUser } from '../actions/user'
import Firebase from '../config/Firebase'
const { width } = Dimensions.get('window');

class LoginScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

    constructor(props) {
      super(props);

      this.state = {
        scrollHeight:Dimensions.get('window').width-100,
        keyboardOpen : false,
        keyboardHeight:0,
      };
      Keyboard.addListener(
             'keyboardDidHide',this.showKeyboard
      )

      Keyboard.addListener(
             'keyboardDidShow', this.hideKeyboard
      )
    }

    componentDidMount = () => {
      Firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.props.getUser(user.uid)
          if (this.props.user != null) {
            console.log(this.props.user,'jjjjjjjjjjjjjj');
            this.props.navigation.navigate('HomeScreen',{user:this.props.user})
          }
        }
      })
	}


  render(){
    const themeColor ='#5aac28'
    return(
      <View style={{flex:1,backgroundColor: '#f8fafb',}}>
          <StatusBar animated={true} backgroundColor="#2653da"/>
           <View style={{flex:1,zIndex:2,}}>
              <View style={{flex:1}}>
                <View style={{flex:0.2,zIndex:2,alignItems:'center',marginHorizontal:30,marginTop:100}}>
                     <Image style={{width:width*0.45,height:width*0.25,resizeMode:'contain'}} source={require('../assets/img/googleicon.png')} />
                </View>
                <View style={{flex:0.8,zIndex:2,}}>
                  <View style={{marginVertical:15,marginHorizontal:30,}}>
                     <Text style={{fontWeight: 'bold',fontSize: 25,color:'#000'}}>Login </Text>
                  </View>
                  <View style={{marginHorizontal:30,width:width-60,marginVertical:15,}}>
                      <TextInput style={{height: 50,borderWidth:1,
                                borderColor:'rgba(0, 0, 0, 0.1)',width:'100%',borderRadius:10,
                                backgroundColor:'rgba(0, 0, 0, 0.1)',paddingHorizontal:15,fontSize:16}}
                           placeholder="Enter email id"
                           placeholderTextColor='rgba(0, 0, 0, 0.5)'
                           selectionColor={'#000'}
                           onChangeText={email => this.props.updateEmail(email)}
                           value={this.props.user.email}
                           keyboardType={'email-address'}
                        />
                  </View>

                  <View style={{marginHorizontal:30,width:width-60,marginVertical:15,}}>
                       <TextInput style={{height: 50,borderWidth:1,borderColor:'rgba(0, 0, 0, 0.1)',width:'100%',borderRadius:10,backgroundColor:'rgba(0, 0, 0, 0.1)',paddingHorizontal:15,fontSize:16}}
                           placeholder="Enter password"
                           placeholderTextColor='rgba(0, 0, 0, 0.5)'
                           selectionColor={'#000'}
                           onChangeText={password => this.props.updatePassword(password)}
                           value={this.props.user.password}
                           keyboardType={'visible-password'}
                        />
                  </View>
                  <TouchableOpacity onPress={()=>{this.props.login()}} style={{alignItems:'center',justifyContent:'center',marginHorizontal:30,width:width-60,borderRadius:10,marginVertical:15,paddingVertical:12,backgroundColor:'#286090'}}>
                     <Text style={{fontSize:18,color:'#fff',fontWeight:'600'}}>Sign In</Text>
                  </TouchableOpacity>
                </View>
              </View>
          </View>
      </View>
     )
  }
}



const mapStateToProps =(state) => {
    return {
      user: state.user
  }
}
const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateEmail, updatePassword, login, getUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
