import { View,  SafeAreaView, ScrollView, TextInput, TouchableOpacity ,Image} from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import {  Text,Avatar } from 'react-native-paper'
import MyCarousel from '../../../components/MyCarousel'
import logo from '../../../assets/Images/logo.png'



export default function Home({navigation}) {






  return (
    <SafeAreaView style={{  flex: 1, backgroundColor: '#fff' }}>
        <View style={{padding:20}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Ionicons onPress={()=>navigation.openDrawer()} name="reorder-three-outline" size={40}></Ionicons>

          <Image source={logo} style={{width:80,height:40}} />
          <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>

          <Avatar.Icon icon='account-circle-outline' color='#fff' style={{backgroundColor:'#f28a89'}}  size={40}     ></Avatar.Icon>
          </TouchableOpacity>

        </View>
        </View>
      <ScrollView style={{width:'100%'}} showsVerticalScrollIndicator={false}>
        <View style={{padding:20}}>

        <View style={{ paddingVertical: 10 }}>
          <Text variant='headlineSmall' style={{fontFamily:'Poppins-Bold' }}> Find Your Best Property</Text>
        </View>
        <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between'}} onPress={()=>navigation.navigate('Filter')}>
          <View style={{ backgroundColor: '#F4F8F9', flexDirection: 'row',borderRadius:10 ,width:'83%'}}>
            <Ionicons name='search-outline' size={20} style={{ padding: 10,marginTop:2 }} />
            <Text style={{ paddingVertical: 10,marginTop:2,color:'#ccc' }}> Search....</Text>
          </View>
          <View style={{backgroundColor:'#F28a89',width:"15%",padding:1 ,justifyContent:'center',alignItems:'center',borderRadius:10}}>
<View>

<Ionicons name='options-outline' color='#fff' size={20} />
</View>
          </View>
        </TouchableOpacity>
        <View style={{ paddingVertical: 10,marginVertical:10 }}>
          <Text variant='headlineSmall' style={{ fontFamily:'Poppins-Bold'}}> This Might Help You</Text>
        </View>
<View >
<View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
<TouchableOpacity style={{justifyContent:'center',alignItems:'center',}} onPress={()=>navigation.navigate('Appartments')}>
  <MaterialCommunityIcons name='home-city-outline' color='#F28A89' style={{backgroundColor:'#FFE6E7',padding:10,borderRadius:10,marginBottom:5}} size={45} />
  <Text style={{textAlign:'center',fontFamily:'Poppins-Regular'}}>Appartments</Text>
</TouchableOpacity>
<TouchableOpacity style={{justifyContent:'center',alignItems:'center',padding:5}} onPress={()=>navigation.navigate('HotelRooms')}>
  <FontAwesome5 name='hotel' size={45} color='#F28A89'
  style={{backgroundColor:'#FFE6E7',padding:10,borderRadius:10,marginBottom:5}}
  />
  <Text style={{textAlign:'center',fontFamily:'Poppins-Regular',}}>Hotels</Text>
</TouchableOpacity>

<TouchableOpacity onPress={()=>navigation.navigate('Houses')} style={{justifyContent:'center',alignItems:'center',padding:5}}>
  <Ionicons name='home' size={45} color='#F28A89' style={{backgroundColor:'#FFE6E7',padding:10,borderRadius:10,marginBottom:5}} />
  <Text style={{textAlign:'center',fontFamily:'Poppins-Regular'}}>For Sale</Text>
</TouchableOpacity>
<TouchableOpacity  onPress={()=>navigation.navigate('RentHouses')} style={{justifyContent:'center',alignItems:'center',padding:5}} >
  <Ionicons name='newspaper' size={45} color='#F28A89' style={{backgroundColor:'#FFE6E7',padding:10,borderRadius:10,marginBottom:5,textAlign:'center'}} />
  <Text style={{textAlign:'center',fontFamily:'Poppins-Regular'}}>For Rent</Text>
</TouchableOpacity>

</View>
</View>
<View style={{ paddingVertical: 10 ,marginVertical:10}}>
          <Text variant='titleLarge' style={{ fontFamily:'Poppins-Bold'}}> Recommanded For You</Text>
        </View>

<View>
  <MyCarousel />
</View>
        </View>
      </ScrollView>
  
    </SafeAreaView>
  )
}