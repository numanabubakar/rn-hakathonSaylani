import { View, Button, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth'
import { useAuthContext } from '../../../context/AuthContext'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Text } from 'react-native-paper'
import MyCarousel from '../../../components/MyCarousel'
export default function Home({navigation}) {
  const { user, dispatch } = useAuthContext()
  const handlelogout = () => {
    auth().signOut()
      .then(() => {
        dispatch({ type: "LOGOUT" })
      })
      .catch(err => {
        console.error(err)
      })

  }
  return (
    <SafeAreaView style={{ padding: 20, flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={{width:'100%'}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Ionicons onPress={()=>navigation.openDrawer()} name="reorder-three-outline" size={32}></Ionicons>
          <Ionicons name="person-circle-outline" size={32}></Ionicons>

        </View>
        <View style={{ paddingVertical: 10 }}>
          <Text variant='headlineSmall' style={{ fontWeight: 'bold' }}> Find Your Best Property</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{ backgroundColor: '#F4F8F9', flexDirection: 'row',borderRadius:10 ,width:'83%'}}>
            <Ionicons name='search-outline' size={20} style={{ padding: 10,marginTop:2 }} />
            <TextInput  placeholder='Search...'/>
          </View>
          <View style={{backgroundColor:'#023047',width:"15%",padding:1 ,justifyContent:'center',alignItems:'center',borderRadius:10}}>
<TouchableOpacity>

<Ionicons name='options-outline' color='#fff' size={20} />
</TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingVertical: 10,marginVertical:10 }}>
          <Text variant='headlineSmall' style={{ fontWeight: 'bold' }}> This Might Help You</Text>
        </View>
<View >
<View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
<View style={{justifyContent:'center',alignItems:'center',}}>
  <Ionicons name='card' color='#F28A89' style={{backgroundColor:'#FFE6E7',padding:10,borderRadius:10,marginBottom:5}} size={45} />
  <Text style={{textAlign:'center'}}>Find Agent</Text>
</View>
<View>
  <Ionicons name='map' size={45} color='#F28A89'
  style={{backgroundColor:'#FFE6E7',padding:10,borderRadius:10,marginBottom:5}}
  />
  <Text style={{textAlign:'center',}}>Maps</Text>
</View>
<View>
  <Ionicons name='home' size={45} color='#F28A89' style={{backgroundColor:'#FFE6E7',padding:10,borderRadius:10,marginBottom:5}} />
  <Text style={{textAlign:'center'}}>Houses</Text>
</View>
<View>
  <Ionicons name='newspaper' size={45} color='#F28A89' style={{backgroundColor:'#FFE6E7',padding:10,borderRadius:10,marginBottom:5}} />
  <Text style={{textAlign:'center'}}>News</Text>
</View>
</View>
</View>
<View style={{ paddingVertical: 10 ,marginVertical:10}}>
          <Text variant='titleLarge' style={{ fontWeight: 'bold' }}> Recommanded For You</Text>
        </View>

<View>
  <MyCarousel />
</View>
      </ScrollView>
    </SafeAreaView>
  )
}