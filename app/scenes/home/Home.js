import React, {useState, useContext} from 'react';
import {Text, View, Button, ActivityIndicator, Alert, StyleSheet, Image, FlatList, TouchableOpacity} from 'react-native';

import { useAuth } from "../../providers/auth";

//////====================================The DRAWER =====================================

import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from "react-navigation-stack"
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
//===========================functions with props=========
function Setting(props){
    
    
    const {state, handleLogout}= useAuth();
    const user = state.user;

    return (
       <View>
            <Button title={"Update Profile"} onPress={() => props.navigation.navigate('UpdateProfile')}/>

            <Button title={"Log Out"} onPress={() => {
                handleLogout();
                props.navigation.navigate('Auth');
            }}/>
        </View>
    );
}
//========================================================


const Header =({name, openDrawer})=> (
  <View style={styles.header}>
    <TouchableOpacity onPress={()=>openDrawer()}>
      <Ionicons name="ios-menu" size={32} />
    </TouchableOpacity>
    <Text>{name}</Text>
    <Text style={{width:50}}></Text>
  </View>
)
const Homer = ({navigation}) => (
  <View style={styles.container}>
    <Header name="Homer" openDrawer={navigation.openDrawer}/>
    <Image source ={require("../../Images/banner.png")} style={{width:"80%", height:"30%"}} resizeMode="contain"/>
    <Text style={{padding:20}}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet dictum sapien, nec viverra orci. Morbi sed maximus purus. Phasellus quis justo mi. Nunc ut tellus lectus. 
    </Text>
    <Text style={{padding:20}}>
    In eleifend, turpis sit amet suscipit tincidunt, felis ex tempor tellus, at commodo nunc massa rhoncus dui. Vestibulum at malesuada elit.
    </Text>

  </View>
)
//==================================profile================================

const Profile = ({navigation}) => (
  <View style={styles.container}>
    <Header name="Profile" openDrawer={navigation.openDrawer}/>
    <Image source ={require("../../Images/banner.png")} style={{width:"80%", height:"30%"}} resizeMode="contain"/>
    <Text style={{padding:20}}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet dictum sapien, nec viverra orci. Morbi sed maximus purus. Phasellus quis justo mi. Nunc ut tellus lectus. 
    </Text>
    <Text style={{padding:20}}>
    In eleifend, turpis sit amet suscipit tincidunt, felis ex tempor tellus, at commodo nunc massa rhoncus dui. Vestibulum at malesuada elit.
    </Text>
  </View>
)

const Settings = ({navigation}) => (
    <View style={styles.container}>
      <Header name="Settings" openDrawer={navigation.openDrawer}/>
      <Image source ={require("../../Images/banner.png")} style={{width:"80%", height:"30%"}} resizeMode="contain"/>
      <Setting></Setting>
    </View>
  )
  
//=================================New Picture ==========================
const Pictures = ({navigation}) => (
  <View style={styles.container}>
    <View>
    <Header name="Pictures" openDrawer={navigation.openDrawer}/>
    </View>
    <App/>
    </View>
  
    
  
  
)
/****************************************************************/
 

//=======================================================================

function Item({ item, navigate }) {
  return (
    <TouchableOpacity style={styles.listItem} onPress={()=>navigate(item.name)}>
      <Ionicons name={item.icon} size={32} color ='red' />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );
}

class Sidebar extends React.Component {
  state = {
      routes:[
          {
              name:"Home",
              icon:"ios-home"
          },
          {
              name:"Profile",
              icon:"ios-contact"
          },
          {
              name:"Settings",
              icon:"ios-settings"
          },
          {
            name:"Pictures",
            icon:"ios-camera"
          },
      ]
  }

  
  render(){
      return (
          <View style={styles.container}>
              <Image source={require("../../Images/profile.jpg")} style={styles.profileImg}/>
              <Text style={{fontWeight:"bold",fontSize:16}}>Janna Doe</Text>
              <Text style={{color:"gray",marginBottom:10}}>janna@doe.com</Text>
              <View style={styles.sidebarDivider}></View>
              <FlatList
                  style={{width:"100%",marginLeft:30}}
                  data={this.state.routes}
                  renderItem={({ item }) => <Item  item={item} navigate={this.props.navigation.navigate}/>}
                  keyExtractor={item => item.name}
              />
          </View>
      )
  }
}

const Drawer = createDrawerNavigator(
  {
    Homer:{ screen: Homer},
    Profile:{ screen: Profile},
    Settings:{ screen: Settings},
    Pictures:{ screen: Pictures}

  },
  {
    initialRouteName: "Homer",
    unmountInactiveRoutes: true,
    headerMode: "none",
    contentComponent: props => <Sidebar {...props} />
  }
)

const AppNavigator = createStackNavigator(
  {
    Drawer : {screen: Drawer},
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none",
    unmountInactiveRoutes: true
  }
)

const AppContainer = createAppContainer(AppNavigator);
//=================================================================END================================



  
  export default function Home(props) {
    

    return (
          <AppContainer />
        
    );
}
  

//========================================Styles===================================================
const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      paddingTop:40,
      alignItems:"center",
      flex:1
  
    },
    listItem:{
        height:60,
        alignItems:"center",
        flexDirection:"row",
    },
    title:{
        fontSize:18,
        marginLeft:20
    },
    header:{
      width:"100%",
      height:60,
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
      paddingHorizontal:20
    },
    profileImg:{
      width:80,
      height:80,
      borderRadius:40,
      marginTop:20
    },
    sidebarDivider:{
      height:1,
      width:"100%",
      backgroundColor:"lightgray",
      marginVertical:10
    }
  });