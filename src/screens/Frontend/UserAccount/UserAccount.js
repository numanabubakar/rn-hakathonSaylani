import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Text, Button, TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons'
import firestore from '@react-native-firebase/firestore';
import { useAuthContext } from '../../../context/AuthContext';
import  Toast  from 'react-native-toast-message';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";



export default function UserAccount({ navigation }) {
  const [state ,setState]=useState({
    fullName:'',
    userName:'',
    phoneNo:'',
  })
  const [currentUserData, setCurrentUserData] = useState([])
  const { user, dispatch } = useAuthContext()
  const [isLoading, setIsLoading] = useState(true)
  const [editable, setEditable] = useState(true)
  const [isProcess, setIsProcess] = useState(false)

  useEffect(() => {
    UserData()

  }, [])

  const UserData = async () => {
    const userInfo = await firestore().collection('users').doc(user.uid).get()
    const User = userInfo.data()
    setCurrentUserData(User)
    setIsLoading(false)
  }

const HandleIcon =()=>{
setEditable(!editable)
setState(
  {
    fullName: currentUserData.fullName,
    userName: currentUserData.userName,
    phoneNo: currentUserData.phoneNo
  }
)
}


const handleChange=(name, val)=>{
  setState(s => ({ ...s, [name]: val }))
console.log(state)
}
const HandleUpdate =()=>{
  setIsProcess(true)
  const {fullName,userName,phoneNo} = state
  
  if(!fullName || fullName.length < 4){
    setIsProcess(false)
    return(
  
      Toast.show({
        type: 'error',
        text1: 'Please Add Correct Full Name',
        position: 'top',
        visibilityTime: 3000,
        bottomOffset: 30
      })
      )
  }
  else if(!userName || userName.length < 4){
    setIsProcess(false)
    return(
  
      Toast.show({
        type: 'error',
        text1: 'Please Add Correct Username',
        position: 'top',
        visibilityTime: 3000,
        bottomOffset: 30
      })
      )
  }
  else if(!phoneNo || phoneNo.length < 10){
    setIsProcess(false)
    return(
  
      Toast.show({
        type: 'error',
        text1: 'Phone Number Must be Upto 10 Digit',
        position: 'top',
        visibilityTime: 3000,
        bottomOffset: 30
      })
      )
  }
  
  
  
  firestore()
  .collection('users')
  .doc(currentUserData.uid)
  .update({
    fullName: fullName,
    userName :userName,
    phoneNo:phoneNo
  })
  .then(() => {
    setIsProcess(false)
    setEditable(true)
    return(
      Toast.show({
        type: 'success',
        text1: 'Your Account Has been Update Successfuly',
        position: 'top',
        visibilityTime: 3000,
        bottomOffset: 30
      })
      )

  });
}

  return (

    <View style={{ backgroundColor: '#fff', padding: 20, flex: 1 }}>

      <View>
        <Ionicons onPress={() => navigation.openDrawer()} name="reorder-three-outline" size={32}></Ionicons>
      </View>
      <View style={{ paddingVertical: 10 }}>
        <Text variant='headlineLarge' style={{ fontFamily: "Poppins-Bold", textAlign: 'center' }}> My Account </Text>
      </View>
      <View style={{ justifyContent: 'center', alignItems: "center", paddingVertical: 20 }}>
        {isLoading ?
          
          <SkeletonPlaceholder>
            <View style={{
padding:20
            }}>
              <View style={{
                width:  40,
                height: 35,
                borderRadius:5,
                marginBottom: 10,
                alignSelf:'flex-end'
              }} />
              <ScrollView >
              

                  <View style={{ width: 290, height: 50, borderRadius: 4 ,marginBottom:5}} />
                  <View style={{ width: 290, height: 50, borderRadius: 4 ,marginBottom:5}} />
                  <View style={{ width: 290, height: 50, borderRadius: 4 ,marginBottom:5}} />
                  <View style={{ width: 290, height: 50, borderRadius: 4 ,marginBottom:5}} />
      
                
              </ScrollView>
            </View>
            
          </SkeletonPlaceholder>
          :
          <View style={{ width: '100%', alignItems: "center", justifyContent: 'center' }}>
            <TouchableOpacity onPress={HandleIcon} style={{ alignSelf: 'flex-end', paddingHorizontal: 10 }}>
              <Ionicons name={editable ? 'create-outline' : 'create'} size={26}  color='#F28A89'/>

            </TouchableOpacity>
            <View style={styles.inputView}>

              <TextInput
                mode='outlined'
                label={'Full Name'}
                defaultValue={currentUserData.fullName}
                disabled={editable}
                underlineColor='#F28A89'
                outlineColor='#F28A89'
                left={<TextInput.Icon name='account' />}
                // underlineColorAndroid='#F28A89'
                activeOutlineColor='#F28A89'
                //   right={<TextInput.Affix  />}
                onChangeText={(val) => handleChange('fullName', val)}
                style={styles.TextInput}
              />
            </View >
            <View style={styles.inputView}>

              <TextInput
                mode='outlined'
                label='Username'
                defaultValue={currentUserData?.userName}
                disabled={editable}
                underlineColor='#F28A89'
                outlineColor='#F28A89'
                left={<TextInput.Icon name='account-circle' />}
                // underlineColorAndroid='#F28A89'
                activeOutlineColor='#F28A89'
                //   right={<TextInput.Affix  />}
                onChangeText={(val) => handleChange('userName', val)}

                style={styles.TextInput}
              />
            </View>
            

            <View style={styles.inputView}>

              <TextInput
                mode='outlined'
                label='Phone No'
                disabled={editable}
                defaultValue={currentUserData?.phoneNo}
                underlineColor='#F28A89'
                outlineColor='#F28A89'
                left={<TextInput.Icon name='phone' />}
                activeOutlineColor='#F28A89'
                keyboardType='numeric'
                onChangeText={(val) => handleChange('phoneNo', val)}
                style={styles.TextInput}
              />
            </View>
            <View style={styles.inputView}>

              <TextInput
                mode='outlined'
                label='Email'
                value={currentUserData?.email}
                disabled
                underlineColor='#F28A89'
                outlineColor='#F28A89'
                left={<TextInput.Icon name='at' />}
                // underlineColorAndroid='#F28A89'
                activeOutlineColor='#F28A89'
                //   right={<TextInput.Affix  />}
                keyboardType='email-address'
                style={styles.TextInput}
              />
            </View>
              {editable? null :
            <View style={{ paddingVertical: 20,} }>
              <Button mode='contained' icon='content-save-outline'  disabled={isProcess} buttonColor='#F28A89' style={{ borderRadius: 3, marginBottom: 10 }} loading={isProcess} onPress={HandleUpdate}>Save Changes</Button>
              <Button mode='contained-tonal' disabled={isProcess} style={{ borderRadius: 3, }} onPress={()=>setEditable(true)} >Cancel</Button>

            </View>
            }

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
  
    backgroundColor: 'transparent',
    
    marginLeft: 5,


  },
})