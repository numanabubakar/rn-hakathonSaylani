import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Text, Button, TextInput, } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-toast-message';
import { useAuthContext } from '../../context/AuthContext';
import logo from "../../assets/Images/logo.png";
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
                if (error.code === "auth/user-not-found") {
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
                if (error.code === "auth/wrong-password") {
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
                if (error.code === "auth/too-many-requests") {
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
                <View style={{marginBottom:20}}>
                    <Text variant='headlineLarge' style={{fontFamily:'Poppins-Bold',color:'#F28A89',textAlign:'center'}}> Real State !</Text>
                    <Text style={{color:'#F28A89',textAlign:'center',fontFamily:'Poppins-Regular'}}> Everything Property Managers Need!</Text>

                </View>
                <Image source={logo}  style={{width:150,height:100,marginBottom:20,}}/>
                <View style={{ marginBottom:10 }}>
                    <Text variant='titleLarge' style={{ color: '#F28A89', fontFamily: 'Poppins-Bold', textAlign:'center'}} >Login Here
                    </Text>
                    
                </View>
                <View style={styles.inputView}>

                    <TextInput
                        mode='outlined'
                        label="Email"
                        underlineColor='#F28A89'
                        outlineColor='#F28A89'
                        left={<TextInput.Icon name='at' color='#F28A89' />}     
                        // underlineColorAndroid='#F28A89'
                        activeOutlineColor='#F28A89'
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
                        underlineColor='#F28A89'
                        outlineColor='#F28A89'
                        activeOutlineColor='#F28A89'
                        onChangeText={(val) => handleChange('password', val)}
                        left={<TextInput.Icon name='lock' />}
                        right={<TextInput.Icon color='#F28A89' name={showPass ? 'eye-off' : 'eye'} onPress={() => setShowPass(!showPass)} />}
                        secureTextEntry={showPass}
                        style={styles.TextInput}
                    />
                </View>
                <View>

                </View>
                <Button mode='contained' style={styles.loginBtn} buttonColor='#F28A89' 
                textColor='#8ecae6' onPress={handleLogin} loading={isProcess} disabled={isProcess} >
                    <Text style={{ fontWeight: 'bold',color:'#8ecae6' }}>
                        {!isProcess ? <>
                            <Ionicons size={18} name='log-in-outline'
                            color={'#fff'} />
                            <Text style={{ color:'#fff',fontSize:15 ,fontFamily: 'Poppins-Bold'}}> LOGIN</Text>
                        </> : <></>}
                    </Text>
                </Button>
                <TouchableOpacity onPress={()=>navigation.navigate('ForgetPassword')} >
                    <Text style={styles.forgot_button}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={{ color: '#000', fontFamily: 'Poppins-Bold' }}> Don't Have an Account ? </Text>
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
        fontFamily: 'Poppins-Bold'
    },

    TextInput: {
        // height: 20,
        // flex: 1,
        backgroundColor: 'transparent',
        // padding: 5,
        marginLeft: 5,
        fontFamily: 'Poppins-Bold'


    },
    forgot_button: {
        height: 30,
        marginBottom: 30,
        color: '#000',
        fontFamily: 'Poppins-Regular'
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