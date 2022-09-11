import { View, StyleSheet } from 'react-native'
import Lottie from 'lottie-react-native'
import React from 'react'

export default function ScreenLoader() {
  return (
    <View style={styles.Container}>
      <Lottie source={require('../assets/Images/house.json')} autoPlay loop />
    </View>
  )
}
const styles = StyleSheet.create({Container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff6'
}})