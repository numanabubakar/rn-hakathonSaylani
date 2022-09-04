import { View,Image, ScrollView, StyleSheet, Dimensions, Platform ,TouchableOpacity} from 'react-native'
import {Text,Avatar} from 'react-native-paper'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useFavContext } from '../../../context/FavouriteContext';
import logo from '../../../assets/Images/logo.png'
const {width: screenWidth} = Dimensions.get('window');
export default function Wishlist({navigation}) {
const { favHouses, dispatch } = useFavContext();
console.log(favHouses.length)
  return (
        <ScrollView style={{backgroundColor:'#fff',padding:20}} >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Ionicons onPress={()=>navigation.openDrawer()} name="reorder-three-outline" size={40}></Ionicons>
          <Image source={logo} style={{width:80,height:40}} />
          <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>

<Avatar.Icon icon='account-circle-outline' color='#fff' style={{backgroundColor:'#f28a89'}}  size={40}     ></Avatar.Icon>
</TouchableOpacity>
        </View>
        <View style={{paddingTop:25,flexDirection:'row',justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#ccc9',paddingBottom:10}}>
<Ionicons  name='heart' color='#f28a89'  size={35} />
            <Text variant='headlineLarge' style={{textAlign:'center',fontFamily:'Poppins-Bold'}}> My WishList </Text>
        </View>
    <View style={styles.container}>
      {favHouses.length < 1 ? '' : <TouchableOpacity style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'center',paddingVertical:5}} onPress={()=>dispatch({type: 'EMPTY'})}>
        <Ionicons  name='trash-outline'  size={22}/>
        <Text style={{fontFamily:'Poppins-Regular'}}>Clear All </Text>
      </TouchableOpacity>}
      {favHouses.length === 0 ?
      
 <Text variant='titleLarge' style={{fontFamily:'Poppins-Regular',textAlign:'center',paddingVertical:10}}> You Have No House in Wishlist  </Text>     
      : favHouses.map((item,index)=>{
        return(
          
<View key={index} style={{borderBottomWidth:1,borderBottomColor:'#ccc',paddingVertical:5}}>
  
            <TouchableOpacity  style={{justifyContent:'flex-end',alignItems:'flex-end'}} onPress={()=> dispatch({ type: 'DELETE', id: item.uid, item })}>
              <Ionicons  name='close-circle-outline' size={20}/>
            </TouchableOpacity>
          <TouchableOpacity  style={{flexDirection:'row',padding:3}} onPress={()=>navigation.navigate('ItemDetail',{item})}>
<View style={{width:'30%'}}>
<Image source={{uri:item.Url}} style={styles.image} />
</View>
<View style={{width:'70%',paddingHorizontal:12}}>
<Text style={{fontFamily:'Poppins-Bold'}}>{item.Title}</Text>
<Text>Price : {item.Price} PKR</Text>
<Text>Area : {item.Area}</Text>
<Text>Property Type : {item.Type}</Text>

</View>

</TouchableOpacity>
  </View>
  )

      })}
    </View>
</ScrollView>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      // alignItems: "center",
      // justifyContent: 'center'
    },
    item: {
      width: screenWidth - 60,
      height: screenWidth - 120,
      borderWidth:1,
      borderColor:'#F28A89',
      padding:10,
      marginBottom:10
    },
    imageContainer: {
      flex: 1,
      marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
      backgroundColor: 'white',
      borderRadius: 8,
    },
    image: {
   width:100,
   height:100
    },
    title:{
      fontWeight:'bold',
  // paddingHorizontal:5,
  fontSize:15,
  color:'#023047'
    }
  });