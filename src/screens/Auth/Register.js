import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Text ,Button,TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useAuthContext } from '../../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons'
import  Toast  from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';
import firebase from "@react-native-firebase/app"
export default function Register({navigation}) {
    const initialState = {
        fullName:'',
        userName:'',
        email: '',
        password: '',
        phoneNo:''
    }
    const {dispatch} = useAuthContext();
    const [showPass, setShowPass] = useState(true)
    const [state, setState] = useState(initialState)
    const [isProcess, setIsProcess] = useState(false)
    const handleChange=(name,val)=>{
      setState(s=>({...s,[name]:val}))
    }
    
    const handleRegister=()=>{
      setIsProcess(true)
      const {email,password}=state ;
      auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user =userCredential.user
        console.log(user)
        createUserProfile(user)
       
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Toast.show({
            type:'error',
            text1: "Email Already Have an Account",
            text2:'Please Enter a Valid Email!',
            position:'top',
            visibilityTime:3000,
            bottomOffset:30
            
          })
        }
    
       if (error.code === 'auth/invalid-email') {
        Toast.show({
          type:'error',
          text1: "Invalid Email",
          text2:'Please Enter a Valid Email!',
          position:'top',
          visibilityTime:3000,
          bottomOffset:30
          
        })
          console.log('That email address is invalid!');
        }
        if(error.Code === "auth/weak-password"){
          return (
            Toast.show({
              type:'error',
              text1: "Weak Password",
              text2:'Please Enter Strong Password!',
              position:'top',
              visibilityTime:3000,
              bottomOffset:30
              
            })
          )
        }
         
    
        console.error(error);
      }).finally(()=>{
        setIsProcess(false)
      });
    
     
      // setIsProcess(false)
      console.log(email,password);
    
    }


    const createUserProfile = (user) => {
        const {fullName,userName,phoneNo}= state;
        let formData = {
            fullName: fullName,
            userName: userName,
            phoneNo: phoneNo,
            email: user.email,
            uid: user.uid,
            dateCreated: firebase.firestore.FieldValue.serverTimestamp()
        }
        firestore()
            .collection('users')
            .doc(user.uid)
            .set(formData)
            .then(() => {
                console.log('User added!');
                dispatch({ type: "LOGIN", payload: { user } })
                setIsProcess(false)
                Toast.show({
                  type:'success',
                  text1: "Account Created Successfully",
                  position:'top',
                  visibilityTime:3000,
                  bottomOffset:30
                  
                })
                
            })
            .catch(err => {
                console.error(err)
            })
            .finally(() => {
                setIsProcess(false)
            })
    }

    
  return (
    <View style={styles.flexContainer}>

    <View style={styles.Container}>
        <View style={{marginBottom:20}}>
            <Text variant='displayLarge' style={{fontWeight:'bold',color:'#023047'}}> Real State !</Text>
            <Text style={{color:'#023047',textAlign:'center'}}> Everything Property Managers Need!</Text>

        </View>
        {/* <Image source={Hello}  style={{width:100,height:70,marginBottom:20,}}/> */}
        <View style={{ marginBottom:10 }}>
            <Text variant='displaySmall' style={{ color: '#023047', fontWeight: 'bold', textAlign:'center'}} >Register Here
            </Text>
            
        </View>
        <View style={styles.inputView}>

            <TextInput
                mode='outlined'
                label="Full Name"
                underlineColor='#023047'
                outlineColor='#023047'
                left={<TextInput.Icon  name='account' />}     
                // underlineColorAndroid='#023047'
                activeOutlineColor='#023047'
                //   right={<TextInput.Affix  />}
                onChangeText={(val) => handleChange('fullName', val)}
                style={styles.TextInput}
            />
        </View>
        <View style={styles.inputView}>

            <TextInput
                mode='outlined'
                label="Username"
                underlineColor='#023047'
                outlineColor='#023047'
                left={<TextInput.Icon name='account-circle'  />}     
                // underlineColorAndroid='#023047'
                activeOutlineColor='#023047'
                //   right={<TextInput.Affix  />}
                onChangeText={(val) => handleChange('userName', val)}

                style={styles.TextInput}
            />
        </View>
        <View style={styles.inputView}>

            <TextInput
                mode='outlined'
                label="Email"
                underlineColor='#023047'
                outlineColor='#023047'
                left={<TextInput.Icon name='at'  />}     
                // underlineColorAndroid='#023047'
                activeOutlineColor='#023047'
                //   right={<TextInput.Affix  />}
                onChangeText={(val) => handleChange('email', val)}
                keyboardType='email-address'
                style={styles.TextInput}
            />
        </View>
        <View style={styles.inputView}>
            <TextInput
                mode='outlined'
                label="Password"
                underlineColor='#023047'
                outlineColor='#023047'
                activeOutlineColor='#023047'
                onChangeText={(val) => handleChange('password', val)}
                left={<TextInput.Icon name='lock' />}
                right={<TextInput.Icon color='#023047' name={showPass ? 'eye-off' : 'eye'} onPress={() => setShowPass(!showPass)} />}
                secureTextEntry={showPass}
                style={styles.TextInput}
            />
        </View>
        <View style={styles.inputView}>

<TextInput
    mode='outlined'
    label="Phone No"
    underlineColor='#023047'
    outlineColor='#023047'
    left={<TextInput.Icon name='phone'  />}     
    // underlineColorAndroid='#023047'
    activeOutlineColor='#023047'
    //   right={<TextInput.Affix  />}
    onChangeText={(val) => handleChange('phoneNo', val)}
    keyboardType='numeric'
    style={styles.TextInput}
/>
</View>
        <View>

        </View>
        <Button mode='contained' style={styles.loginBtn} buttonColor='#023047' 
        textColor='#8ecae6' onPress={handleRegister} loading={isProcess} disabled={isProcess} >
            <Text style={{ fontWeight: 'bold',color:'#8ecae6' }}>
                {!isProcess ? <>
                    <Ionicons size={18} name='log-in-outline' />
                    <Text style={{ color:'#8ecae6',fontSize:15 }}> Register</Text>
                </> : <></>}
            </Text>
        </Button>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: '#000', fontWeight: 'bold' }}> Already Have an Account ? </Text>
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