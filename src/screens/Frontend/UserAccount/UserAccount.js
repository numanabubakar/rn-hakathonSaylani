import { StyleSheet, View,ActivityIndicator } from 'react-native'
import React,{useState,useEffect} from 'react'
import { Text ,Button,TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons'
import firestore from '@react-native-firebase/firestore';
import { useAuthContext } from '../../../context/AuthContext';

export default function UserAccount({navigation}) {
  const [currentUserData,setCurrentUserData]=useState([])
const {user,dispatch} =useAuthContext()
const [isLoading,setIsLoading ]=useState(true)

useEffect(()=>{
  UserData()
  console.log(currentUserData)
},[])

  const UserData = async()=>{
    const userInfo = await firestore().collection('users').doc(user.uid).get()
    const User = userInfo.data()
setCurrentUserData(User)
setIsLoading(false)
  }
      






  return (
    
    <View style={{backgroundColor:'#fff',padding:20,flex:1}}>

    <View>
      <Ionicons onPress={()=>navigation.openDrawer()} name="reorder-three-outline" size={32}></Ionicons>
    </View>
    <View style={{paddingVertical:10}}>
      <Text variant='headlineLarge' style={{fontFamily:"Poppins-Bold",textAlign:'center'}}> My Account </Text>
    </View>
    <View style={{justifyContent:'center',alignItems:"center",paddingVertical:20}}>
{isLoading ?
  <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
      <ActivityIndicator size='large' color='#F28A89' />
</View>
:<View style={{width:'100%',alignItems:"center",justifyContent:'center'}}>

    <View style={styles.inputView}>

<TextInput
    mode='outlined'
    label={'Full Name'}
    value={currentUserData.fullName}
    disabled
    underlineColor='#023047'
    outlineColor='#023047'
    left={<TextInput.Icon  name='account' />}     
    // underlineColorAndroid='#023047'
    activeOutlineColor='#023047'
    //   right={<TextInput.Affix  />}
    // onChangeText={(val) => handleChange('fullName', val)}
    style={styles.TextInput}
/>
</View >
<View style={styles.inputView}>
  
<TextInput
    mode='outlined'
    label='Username'
    value={currentUserData?.userName}
    disabled
    underlineColor='#023047'
    outlineColor='#023047'
    left={<TextInput.Icon name='account-circle'  />}     
    // underlineColorAndroid='#023047'
    activeOutlineColor='#023047'
    //   right={<TextInput.Affix  />}
    // onChangeText={(val) => handleChange('userName', val)}
    
    style={styles.TextInput}
/>
</View>
<View style={styles.inputView}>

<TextInput
    mode='outlined'
    label='Email'
    value={currentUserData?.email}
    disabled
    underlineColor='#023047'
    outlineColor='#023047'
    left={<TextInput.Icon name='at'  />}     
    // underlineColorAndroid='#023047'
    activeOutlineColor='#023047'
    //   right={<TextInput.Affix  />}
    // onChangeText={(val) => handleChange('email', val)}
    keyboardType='email-address'
    style={styles.TextInput}
/>
</View>

<View style={styles.inputView}>

<TextInput
mode='outlined'
label='Phone No'
disabled
value={currentUserData?.phoneNo}
underlineColor='#023047'
outlineColor='#023047'
left={<TextInput.Icon name='phone'  />}     
activeOutlineColor='#023047'
keyboardType='numeric'
style={styles.TextInput}
/>
</View>
</View>
}
</View>

    </View>
  )
}
const styles = StyleSheet.create({
  flexContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',

  },
  Container: {

      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      height: 500,
      width: '90%',
      borderRadius: 50,

  },

  inputView: {

      width: "90%",
      marginBottom: 10,
  },

  TextInput: {
      // height: 20,
      // flex: 1,
      backgroundColor: 'transparent',
      // padding: 5,
      marginLeft: 5,


  },})