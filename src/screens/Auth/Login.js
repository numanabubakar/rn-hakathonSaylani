import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState, useRef } from 'react'
import { Text, Button, TextInput, } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-toast-message';
import { useAuthContext } from '../../context/AuthContext';

export default function Login({navigation}) {

    const initialState = {
        email: '',
        password: ''
    }
    const { dispatch } = useAuthContext();
    const [state, setState] = useState(initialState)
    const [isProcess, setIsProcess] = useState(false)
    const [showPass, setShowPass] = useState(true)
    const handleChange = (name, val) => {
        setState(s => ({ ...s, [name]: val }))
    }

    const handleLogin = () => {
        setIsProcess(true)
        const { email, password } = state;
        if (!email) {
            setIsProcess(false)
            return (Toast.show({
                type: 'error',
                text1: "Invalid Email",
                text2: 'Enter Your Email',
                position: 'top',
                visibilityTime: 3000,
                bottomOffset: 30,
            }))
        }
        else if (!password) {
            setIsProcess(false)
            return Toast.show({
                type: 'error',
                text1: "Invalid Password",
                text2: 'Enter Your Password',
                position: 'top',
                visibilityTime: 3000,
                bottomOffset: 30

            })

        }

        auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user
                setIsProcess(false)
                Toast.show({
                    type: 'success',
                    text1: "Login Successfuly",
                    position: 'top',
                    visibilityTime: 2000,
                    bottomOffset: 30

                })
                dispatch({ type: 'LOGIN', payload: { user } })

                console.log('User account created & signed in!');
            })
            .catch(error => {


                if (error.code === 'auth/invalid-email') {
                    Toast.show({
                        type: 'error',
                        text1: "Invalid Email",
                        text2: 'That email address is invalid!',
                        position: 'top',
                        visibilityTime: 3000,
                        bottomOffset: 30

                    })
                }
                if (errorCode === "auth/user-not-found") {
                    return (
                        Toast.show({
                            type: 'error',
                            text1: "User Not Found",
                            text2: 'You Have to Sign Up First',
                            position: 'top',
                            visibilityTime: 3000,
                            bottomOffset: 30

                        })
                    )
                }
                if (errorCode === "auth/wrong-password") {
                    return (
                        Toast.show({
                            type: 'error',
                            text1: "Wrong Password",
                            text2: 'Please Enter Correct Password',
                            position: 'top',
                            visibilityTime: 3000,
                            bottomOffset: 30

                        })
                    )
                }
                if (errorCode === "auth/too-many-requests") {
                    return (
                        Toast.show({
                            type: 'error',
                            text1: "You Account Disabled",
                            text2: 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later',
                            position: 'top',
                            visibilityTime: 3000,
                            bottomOffset: 30

                        })
                    )

                }


                console.error(error.code);
            }).finally(() => {
                setIsProcess(false)
            });


        // setIsProcess(false)
        console.log(email, password);

    }
    return (
        <View style={styles.flexContainer}>

            <View style={styles.Container}>
                <View style={{marginBottom:40}}>
                    <Text variant='displayLarge' style={{fontWeight:'bold',color:'#023047'}}> Real State !</Text>
                    <Text style={{color:'#023047',textAlign:'center'}}> Everything Property Managers Need!</Text>

                </View>
                {/* <Image source={Hello}  style={{width:100,height:70,marginBottom:20,}}/> */}
                <View style={{ marginBottom:10 }}>
                    <Text variant='displaySmall' style={{ color: '#023047', fontWeight: 'bold', textAlign:'center'}} >Login Here
                    </Text>
                    
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
                <View>

                </View>
                <Button mode='contained' style={styles.loginBtn} buttonColor='#023047' 
                textColor='#8ecae6' onPress={handleLogin} loading={isProcess} disabled={isProcess} >
                    <Text style={{ fontWeight: 'bold',color:'#8ecae6' }}>
                        {!isProcess ? <>
                            <Ionicons size={18} name='log-in-outline' />
                            <Text style={{ color:'#8ecae6',fontSize:15 }}> LOGIN</Text>
                        </> : <></>}
                    </Text>
                </Button>
                <TouchableOpacity onPress={()=>navigation.navigate('ForgetPassword')} >
                    <Text style={styles.forgot_button}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={{ color: '#000', fontWeight: 'bold' }}> Don't Have an Account ? </Text>
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