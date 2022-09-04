import { View,  StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Text ,Button ,TextInput,} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons'
import  Toast  from 'react-native-toast-message';
import logo from "../../assets/Images/logo.png";



export default function ForgotPassword({navigation}) {
const [email, setEmail] = useState('')
const [isProcess, setIsProcess] = useState(false)

const handleSend=()=>{
  setIsProcess(true)
  if(!email){
    setIsProcess(false)
    return ( Toast.show({
      type:'error',
      text1: "Invalid Email",
      text2:'Enter Your Email',
      position:'top',
      visibilityTime:3000,
      bottomOffset:30,}) ) 
  }
  auth().sendPasswordResetEmail(email).then(()=>{
    setIsProcess(false)
    Toast.show({
        type:'success',
        text1: "Email Send",
        text2:'Please Check Your Email Address',
        position:'top',
        visibilityTime:2000,
        bottomOffset:30
    })
    navigation.navigate('Login')
}).catch(err=>{
    console.log(err.code)
    if(err.code === 'auth/invalid-email'){
        setIsProcess(false)
        return(
            
            Toast.show({
                type:'error',
                text1: "Invalid Email",
                text2:'Enter Your Valid Email',
                position:'top',
                visibilityTime:3000,
                bottomOffset:30,})
                )
            }
            else if(err.code === 'auth/user-not-found'){
    setIsProcess(false)
    return(

        Toast.show({
            type:'error',
            text1: "User Not Found",
            text2:'You Have To Register First',
            position:'top',
            visibilityTime:3000,
            bottomOffset:30,})
            )
        }
    
  }
    
    )

  

}



  return (
    
    <View style={styles.flexContainer}>

            <View style={styles.Container}>
                <View style={{marginBottom:20}}>
                    <Text variant='headlineLarge' style={{fontFamily:'Poppins-Bold',color:'#F28A89',textAlign:'center'}}> Real State !</Text>
                    <Text style={{color:'#F28A89',textAlign:'center',fontFamily:'Poppins-Regular'}}> Everything Property Managers Need!</Text>

                </View>
        <Image source={logo}  style={{width:150,height:100,}}/>

                {/* <Image source={Hello}  style={{width:100,height:70,marginBottom:20,}}/> */}
                <View style={{ marginBottom:10 }}>
                    <Text variant='titleLarge' style={{ color: '#F28A89', fontFamily: 'Poppins-Bold', textAlign:'center'}} >Forget Password Here
                    </Text>
                    
                </View>
                <View style={styles.inputView}>

                    <TextInput
                        mode='outlined'
                        label="Email"
                        underlineColor='#F28A89'
                        outlineColor='#F28A89'
                        left={<TextInput.Icon name='at'  />}     
                        // underlineColorAndroid='#F28A89'
                        activeOutlineColor='#F28A89'
                        //   right={<TextInput.Affix  />}
                        onChangeText={(val) => setEmail(val)}
                        keyboardType='email-address'
                        style={styles.TextInput}
                    />
                </View>
                <View>

                </View>
                <Button mode='contained' style={styles.loginBtn} buttonColor='#F28A89' 
                textColor='#fff' onPress={handleSend} loading={isProcess} disabled={isProcess} >
                    <Text style={{ fontWeight: 'bold',color:'#fff' }}>
                        {!isProcess ? <>
                            <Ionicons size={18} name='log-in-outline' />
                            <Text style={{ color:'#fff',fontSize:15 }}> Send</Text>
                        </> : <></>}
                    </Text>
                </Button>


                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{ color: '#000', fontFamily: 'Poppins-Bold' }}> Back to Login ? </Text>
                </TouchableOpacity>

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


    },
    forgot_button: {
        height: 30,
        marginBottom: 30,
        color: '#000',
    },
    loginBtn:
    {        
        marginVertical: 10,
        paddingHorizontal:16,
        borderRadius:4,
        width:'70%',
        marginBottom:30

    }
})