import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'

export default function ScreenLoader() {
  return (
    <View style={styles.Container}>
      <ActivityIndicator size='large' color='#F28A89' />
    </View>
  )
}
const styles = StyleSheet.create({Container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff6'
}})