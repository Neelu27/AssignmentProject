import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform,TextInput, Image,AsyncStorage,Alert,Dimensions,FlatList,KeyboardAvoidingView,Keyboard,StatusBar} from 'react-native';
import {CheckBox}from 'react-native-elements';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Firebase,{db} from '../config/Firebase'
import { updateEmail, updatePassword, login, getUser } from '../actions/user'
const { width } = Dimensions.get('window');
import generated from '../generated.json';
import HttpsClient from '../helpers/HttpsClient';
import Icon from 'react-native-vector-icons/Ionicons';
class HomeScreen extends React.Component {
    static navigationOptions = {
      header:null,
    }

    constructor(props) {
      super(props);
      var user =this.props.navigation.getParam('user',null)
      console.log(user,'user')
      this.state = {
        ratelist:[{uid:'34562789',title:'DSomething extra',isChecked:true},
                  {uid:'34562789',title:'DSomething extra',isChecked:false},
                  {uid:'34562789',title:'DSomething extra',isChecked:false},
                  {uid:'34562789',title:'DSomething extra',isChecked:false},
                  {uid:'34562789',title:'DSomething extra',isChecked:false},
                  {uid:'34562789',title:'DSomething extra',isChecked:false},
                  {uid:'34562789',title:'DSomething extra',isChecked:false},
                  {uid:'34562789',title:'DSomething extra',isChecked:false}],
        scrollHeight:Dimensions.get('window').width-100,
        keyboardOpen : false,
        keyboardHeight:0,
        search:false,
        user:props.user
      };
      var willFocus = props.navigation.addListener(
     'willFocus',
       payload => {
       this.getData()
       }
     );
    }
    handleSignout = () => {
      console.log('logout');
  		Firebase.auth().signOut()
      console.log('kkkkkkkkkkk');
  		this.props.navigation.navigate('LoginScreen')
      console.log('hhhhhhhhhhhhhhh');
  	}

    componentDidMount(){
      this.getData()
    }
    getData=async()=>{
      var data = await HttpsClient.get('https://mocki.io/v1/1c396924-1562-413a-9f05-560724f092b0')
       if(data.type=='success'){
         console.log(data,'datadata');
           this.setState({ratelist:data.data})
       }else{
         return
       }
     }

    searchData=async(searchText)=>{
      var data = await HttpsClient.get('https://mocki.io/v1/1c396924-1562-413a-9f05-560724f092b0/?title='+searchText)
       if(data.type=='success'){
         console.log(data,'datadata');
           this.setState({ratelist:data.data})
       }else{
         return
       }
    }

    renderHeader=()=>{
  return(
    <View style={{height:55,width:width,backgroundColor:'#2653da',}}>
        <View style={{flexDirection: 'row',height:55,alignItems: 'center',elevation:1,
        borderBottomWidth:1,borderColor:'#f2f2f2'}}>
           <View style={{flex:0.2,justifyContent: 'flex-start', alignItems: 'center',}}>
           {!this.state.search&&
           <Text  numberOfLines={1}
           style={[styles.text,{color:'#fff',fontSize:18,textAlign:'left',fontWeight:'700'}]}>{this.state.user!=null?this.state.user.email:'stt'}</Text>}
           {this.state.search&&
             <TouchableOpacity onPress={()=>{this.setState({search:false});}}
                style={{justifyContent:'center',alignItems:'center',paddingHorizontal:20}}>
                <Icon   name='arrow-back-sharp'size={27} color="#fff" />
            </TouchableOpacity>}
           </View>
           <View style={{flex:0.8}}>
           {this.state.search&& <View style={{width:width*0.7,borderRadius:15,flexDirection:'row',borderWidth:0,marginLeft:0}}>
               <TextInput
                 placeholder={'Search Patient'}
                 style={{ height: 40, borderColor: '#373737', borderWidth: 0,
                 backgroundColor:'#fff',borderTopLeftRadius:10,borderBottomLeftRadius:10,color:'#000',width:'80%',paddingHorizontal:10 }}
                 onChangeText={searchText =>{ this.searchData(searchText)}}
                 value={this.state.searchText}
               />
               <View style={{width:'20%',height:40,alignItems:'center',justifyContent:'center',borderTopRightRadius:10,borderBottomRightRadius:10,backgroundColor:'#fff'}} >
               <Icon name='md-search'size={22} color="#565656" />
               </View>
            </View>}
            {
              !this.state.search&&
            <View style={{flex:1,justifyContent:'center',alignSelf:'flex-end',flexDirection:'row'}}>
           <TouchableOpacity onPress={()=>{this.setState({search:true})}}
              style={{justifyContent:'center',alignItems:'center',paddingHorizontal:10}}>
              <Icon   name='md-search'size={22} color="#fff"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{this.handleSignout()}}
             style={{justifyContent:'center',alignItems:'center',paddingHorizontal:20}}>
             <Icon name="log-out-outline" size={30} color="#fff"/>
         </TouchableOpacity>
        </View>
          }
         </View>
       </View>
     </View>
  )
}

ischecked=async(item,index)=>{
  this.state.ratelist[index].isChecked=!this.state.ratelist[index].isChecked
  this.setState({ratelist:this.state.ratelist})
  var sendData={
    isChecked:item.isChecked
  }
  var data = await HttpsClient.post('https://mocki.io/v1/1c396924-1562-413a-9f05-560724f092b0',sendData)
    if(data.type=='success'){
      console.log(data,'jjjjjjjjj');
      this.state.ratelist[index].isChecked=data.isChecked
      this.setState({ratelist:this.state.ratelist})
    }
}

  render(){
    const themeColor ='#2653da'
    return(
      <View style={{flex:1,backgroundColor: '#f8fafb',}}>
          <StatusBar animated={true} backgroundColor="#2653da"/>
          {this.renderHeader()}
          <View style={{flex:1,zIndex:2,}}>
              <FlatList style={{paddingBottom:100}}
                     data={this.state.ratelist} keyExtractor={(item, index) => index.toString()}
                     ListHeaderComponent={this.renderHeader1}
                     renderItem={({item, index})=>(
                     <View style={{flex:1,justifyContent:'center',padding:width*0.04,margin:8,
                            borderWidth:1,borderRadius:10,borderColor:'#f2f2f2',backgroundColor:'#fff'}}>
                       <View style={{flexDirection:'row',alignItems:'center',
                                      justifyContent:'space-between',borderWidth:0}}>
                         <Text style={{flex:0.5,fontSize:16,color:'#757575',
                                      fontWeight:'700',paddingLeft:10,}}>{"#"+ " "+item.uid}</Text>
                         <CheckBox
                            checkedIcon={<Image source={require('../assets/img/checked.png')}
                                                style={{margin:-10}} />}
                            uncheckedIcon={<Image source={require('../assets/img/unchecked.png')}
                                                style={{margin:-10}} />}
                            checked={item.isChecked}
                            onPress={() => this.ischecked(item,index)}
                          />
                       </View>
                       <Text style={{fontSize:16,color:'#757575',fontWeight:'400',
                                      paddingLeft:10,paddingBottom:10}}>{item.title}</Text>
                     </View>
                   )}
                   />
                   <TouchableOpacity onPress={()=>{this.props.navigation.navigate('CreateNewItem')}} style={{alignItems:'center',justifyContent:'center',marginHorizontal:0,width:width,borderRadius:0,marginVertical:0,paddingVertical:12,backgroundColor:'#2653da'}}>
                     <Text style={{fontSize:18,color:'#fff',fontWeight:'600'}}>CREATE NEW</Text>
                   </TouchableOpacity>
            </View>
      </View>
     )
  }
}


const styles = StyleSheet.create({

})
const mapStateToProps =(state) => {
    return {
      user: state.user
  }
}
const mapDispatchToProps = dispatch => {
	return bindActionCreators({ updateEmail, updatePassword, login, getUser }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
