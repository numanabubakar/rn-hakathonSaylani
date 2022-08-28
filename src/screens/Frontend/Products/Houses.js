import { View,Image, ScrollView, StyleSheet, Dimensions, Platform } from 'react-native'
import {Text,Button} from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons'
const {width: screenWidth} = Dimensions.get('window');
export default function Houses() {
const [products,setProducts]=useState([])

    const ProductData =()=>{
        let array =[]
         
            firestore()
            .collection('Products')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {
                const BannerData =documentSnapshot.data()
                array.push(BannerData)
            });
            setProducts(array)
            });
          }
          useEffect(()=>{
            ProductData()
          },[])

  return (
        <ScrollView style={{backgroundColor:'#fff',padding:20}} >
            <Text variant='headlineLarge' style={{fontWeight:'bold',textAlign:'center',paddingVertical:20}}>Houses For Sale </Text>
    <View style={styles.container}>
      {products.map((item,index)=>{
return(
<View style={styles.item} key={index} >
    <View style={styles.imageContainer}>

        <Image
          source={{uri: item.Url}}
          style={styles.image}        
          />
    </View>
        <Text style={styles.title} numberOfLines={2}>
          {item.Title}
        </Text>
        <View style={{flexDirection:'row',}}>
          <Ionicons name='location' size={15}/>
          <Text>{item.Location} </Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',padding:5}}>

        <Text style={{fontWeight:'bold',fontSize:12,color:'#023047',}}>Price:{item.Price} PKR</Text>
        <Button mode='contained'  buttonColor='#F28A89'  >See More</Button>
        </View>
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
      alignItems: "center",
      justifyContent: 'center'
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
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'cover',
    },
    title:{
      fontWeight:'bold',
  paddingHorizontal:5,
  fontSize:15,
  color:'#023047'
    }
  });