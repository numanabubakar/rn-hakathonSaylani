import { View, Image, ScrollView, StyleSheet, Dimensions, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Button, Text } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import logo from "../../../assets/Images/logo.png";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
const { width: screenWidth } = Dimensions.get('window');
export default function Houses({ navigation }) {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)




  const ProductData = () => {
    let array = []
    firestore()
      .collection('Products')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          const BannerData = documentSnapshot.data()
          array.push(BannerData)
          setIsLoading(false)
        });
        setProducts(array)
      })
  };

  useEffect(() => {
    ProductData()
  }, [])
  const SaleType = products.filter((item, index) => {
    if (item.Type === 'For Sale') {
      return item
    }
  })


  return (
    <ScrollView style={{ backgroundColor: '#fff', padding: 20 }} >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Ionicons onPress={() => navigation.goBack()} name="arrow-back-circle" color='#F28a89' size={32}></Ionicons>
        <Image source={logo} style={{ width: 80, height: 40 }} />
        <Ionicons name="arrow-back-circle" color='#Fff' size={32}></Ionicons>

      </View>
      <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20 }} onPress={() => navigation.navigate('Filter')}>
        <View style={{ backgroundColor: '#F4F8F9', flexDirection: 'row', borderRadius: 10, width: '83%' }}>
          <Ionicons name='search-outline' size={20} style={{ padding: 10, marginTop: 2 }}

          />
          <Text style={{ paddingVertical: 10, marginTop: 2, color: '#ccc' }}> Search..</Text>

        </View>
        <View style={{ backgroundColor: '#F28a89', width: "15%", padding: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
          <View>

            <Ionicons name='options-outline' color='#fff' size={20} />
          </View>
        </View>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', paddingHorizontal: 5 }}>
        <MaterialIcons name='home-export-outline' color='#F28A89' style={{ paddingVertical: 15, paddingHorizontal: 3 }} size={40} />
        <Text variant='headlineLarge' style={{ fontFamily: 'Poppins-Bold', textAlign: 'center', paddingVertical: 20 }}>Houses For Sale </Text>
      </View>

      <View style={styles.container}>

        {isLoading ?
          <SkeletonPlaceholder>
            <View style={{
              alignItems: "center",
              borderBottomWidth: 1,
              borderColor: '#ccc9',

            }}>
              <View style={{
                width: screenWidth - 60,
                height: screenWidth - 225, borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
                marginBottom: 10,
                justifyContent: 'center'
              }} />
              <View >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                  <View style={{ width: 190, height: 20, borderRadius: 4 }} />
                  <View style={{ width: 30, height: 20, borderRadius: 4 }} />
                </View>
                <View
                  style={{ marginTop: 6, width: 290, height: 20, borderRadius: 4 }}
                />
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }} />
                  <View style={{ flexDirection: 'row' }}>

                    <View style={{ marginTop: 6, marginLeft: 6, width: 80, height: 20, borderRadius: 4 }} />
                    <View style={{ marginTop: 6, marginLeft: 6, width: 80, height: 20, borderRadius: 4 }} />
                  </View>
                </View>
              </View>
            </View>
            <View style={{
              alignItems: "center",
              borderBottomWidth: 1,
              marginTop:13,
              borderBottomWidth:1,
              borderBottomColor:'#ccc9'
            }}>
              <View style={{
                width: screenWidth - 60,
                height: screenWidth - 225, borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
                marginBottom: 10,
                justifyContent: 'center'
              }} />
              <View >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                  <View style={{ width: 190, height: 20, borderRadius: 4 }} />
                  <View style={{ width: 30, height: 20, borderRadius: 4 }} />
                </View>
                <View
                  style={{ marginTop: 6, width: 290, height: 20, borderRadius: 4 }}
                />
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }} />
                  <View style={{ flexDirection: 'row' }}>

                    <View style={{ marginTop: 6, marginLeft: 6, width: 80, height: 20, borderRadius: 4 }} />
                    <View style={{ marginTop: 6, marginLeft: 6, width: 80, height: 20, borderRadius: 4 }} />
                  </View>
                </View>
              </View>
            </View>
          </SkeletonPlaceholder>
          :
          SaleType.map((item, index) => {
            return (
              <View key={index}>
                <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ItemDetail', { item })} >
                  <View style={styles.imageContainer}>

                    <Image
                      source={{ uri: item.Url }}
                      style={styles.image}
                    />
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.title} >
                      {item.Price} PKR
                    </Text>
                    <Button onPress={() => navigation.navigate('ItemDetail', { item })} style={{ borderRadius: 0, justifyContent: 'flex-end', alignItems: 'flex-end', }}>

                      <Ionicons color={'#F28A89'} name='chevron-forward-outline' size={25} style={{ padding: 5, }} />
                    </Button>
                  </View>
                  <View style={{ flexDirection: 'row', }}>
                    <Ionicons name='location' size={15} />
                    <Text style={{ fontFamily: 'Poppins-Regular', color: '#0008' }}>{item.Location} </Text>
                  </View>
                  <View style={{ flexDirection: 'row', }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }}>
                      <Ionicons name='bed' color='#F28A89' size={15} style={{ backgroundColor: '#FFE6E7', padding: 5, borderRadius: 10, marginBottom: 5 }} />
                      <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Regular' }}> {item.NoofBedrooms} Beds </Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }}>
                      <MaterialIcons name='food-fork-drink' color='#F28A89' size={15} style={{ backgroundColor: '#FFE6E7', padding: 5, borderRadius: 10, marginBottom: 5 }} />
                      <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Regular' }}> {item.Kitchens} Kitchens </Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                      <FontAwesome5 name='ruler-combined' color='#F28A89' size={15} style={{ backgroundColor: '#FFE6E7', padding: 5, borderRadius: 10, }} />
                      <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Regular', marginLeft: 1 }}>  {item.Area}</Text>
                    </View>

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
    alignItems: "center",
    justifyContent: 'center'
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 120,
    borderBottomWidth: 1,
    borderColor: '#ccc9',
    // padding:10,
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1,
    // marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    width: screenWidth - 60,
    height: screenWidth - 225,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  title: {
    // fontWeight:'bold',
    fontFamily: 'Poppins-Bold',
    paddingHorizontal: 5,
    fontSize: 15,
    color: '#023047'
  }
});