import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform,TextInput, Image,AsyncStorage,Alert,Dimensions,FlatList,KeyboardAvoidingView,Keyboard,StatusBar} from 'react-native';
import {CheckBox}from 'react-native-elements';
import { connect } from 'react-redux'
import Firebase from '../config/Firebase'
const { width } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
class CreateNewItem extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {header:null}
  };

    constructor(props) {
      super(props);
      this.state = {
        email:'',
        password:'',
        scrollHeight:Dimensions.get('window').width-100,
        keyboardOpen : false,
        keyboardHeight:0,
        disableSignUp:false,
        error:false,
      };
      Keyboard.addListener(
             'keyboardDidHide', this.showKeyboard
           )

     Keyboard.addListener(
           'keyboardDidShow', this.hideKeyboard
     )
    }

    onChangeText=(text)=>{
      this.setState({email:text,error:false})
    }


    renderHeader=()=>{
      return(
        <View style={{height:55,width:width,backgroundColor:'#2653da',}}>
          <View style={{flexDirection: 'row',height:55,alignItems: 'center',elevation:1,
            borderBottomWidth:1,borderColor:'#f2f2f2'}}>
              <View style={{ flex: 0.2,justifyContent: 'flex-start', alignItems: 'center',}}>
                <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                  <Icon   name='arrow-back-sharp'size={27} color="#fff" />
                </TouchableOpacity>
              </View>
              <View style={{flex:0.8}}>
                <Text  numberOfLines={1}
                style={[styles.text,{color:'#fff',fontSize:18,textAlign:'left',fontWeight:'700'}]}>{'Create New Data'}</Text>
              </View>
           </View>
         </View>
      )
    }


    createNew=async(item,index)=>{
      var sendData={
        isChecked:false,
        title:this.state.title
      }
      var data = await HttpsClient.post('https://mocki.io/v1/1c396924-1562-413a-9f05-560724f092b0',sendData)
        if(data.type=='success'){
          console.log(data,'jjjjjjjjj');
          this.props.navigation.navigate('HomeScreen')
        }
    }

  render(){
    return(
      <View style={{flex:1,backgroundColor: '#f8fafb',}}>
          <StatusBar animated={true} backgroundColor="#2653da"/>
           {this.renderHeader()}
           <View style={{flex:1,zIndex:2,}}>
                     <View style={{alignSelf:'center',width:width*0.95,marginVertical:30,flexDirection:'row',borderWidth:0,jujustifyContent:'space-between',alignItems:'center'}}>
                       <TextInput style={{height: 50,borderWidth:1,borderColor:'rgba(0, 0, 0, 0.1)',width:width*0.7,borderBottomLeftRadius:10,borderTopLeftRadius:10,backgroundColor:'rgba(0, 0, 0, 0.1)',paddingHorizontal:15,fontSize:16}}
                           placeholder="Enter title"
                           placeholderTextColor='rgba(0, 0, 0, 0.5)'
                           selectionColor={'#000'}
                           onChangeText={query => {this.setState({ title: query }) }}
                           value={this.state.title}
                        />
                        <TouchableOpacity onPress={()=>{this.createNew()}} style={{height:50,borderWidth:1,borderColor:'#2653da',alignItems:'center',justifyContent:'center',paddingHorizontal:20,borderBottomRightRadius:10,borderTopRightRadius:10,paddingVertical:12,backgroundColor:'#2653da'}}>
                          <Text style={{fontSize:18,color:'#fff',fontWeight:'600'}}>Create</Text>
                        </TouchableOpacity>
                      </View>
            </View>
      </View>
     )
  }
}


const styles = StyleSheet.create({

})
const mapStateToProps =(state) => {
    return {
      user:state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateNewItem)
