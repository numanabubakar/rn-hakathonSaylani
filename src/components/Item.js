import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MakeCall from './MakeCall';
import { useFavContext } from '../context/FavouriteContext';

const Item = ({ navigation, route }) => {
const {favHouses,dispatch} =useFavContext()
const [favoriteIcon,setfavoriteIcon]=useState('heart-outline')

    // console.log(route.params.item);
    const item = route.params.item;
  const itemUrl = route.params.item.Url;
  const itemTitle = route.params.item.Title;
  const itemLocation = route.params.item.Location;
  const itemArea = route.params.item.Area;
  const itemDesc = route.params.item.Desc;
  const itemPrice = route.params.item.Price;
  const itemType = route.params.item.Type;
  const itemBedrooms = route.params.item.NoofBedrooms;
  
useEffect(()=>{
    // console.log(favHouses)
const FavData = favHouses.map((prod,index)=>{
        if(prod.uid === item.uid){
            return setfavoriteIcon('heart')
        }
    })
    // console.log(FavData)
},[])

    const handelIcon = (item) => {
        setfavoriteIcon('heart')
        dispatch({ type: 'ADD_TO_FAV', id: item.uid, item })
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar backgroundColor="transparent" barStyle={'light-content'} translucent />
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: itemUrl }} style={styles.image} />
                    <View style={styles.navigation}>
                        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.goBack()}>
                            <Ionicons name="chevron-back" size={25} color="#555355" />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.header}>Details</Text>
                        </View>
                        <TouchableOpacity style={styles.iconContainer} onPress={()=>handelIcon(item)}>
                            <Ionicons name={favoriteIcon} size={25} color="#F28A89" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.imageTextContainer}>
                        <Text style={styles.title}>{itemTitle}</Text>
                        <View style={styles.locationContainer} >
                            <Ionicons name="location-outline" size={20} color="#fff" />
                            <Text style={[styles.title, { fontSize: 15, marginLeft: 8 }]}>{itemLocation}</Text>
                        </View>
                    </View>
                </View>
                <ScrollView style={{backgroundColor:'#fff'}}>
                    <View style={styles.priceContainer}>
                        
                            <Text style={[styles.title, { color: '#333333',fontSize:25 ,width:'100%'}]}>Price : {itemPrice} PKR </Text>
                        
                       
                    </View>
                    <View style={styles.facilitiesContainer}>
                            <View style={styles.facilities}>
                            <Ionicons name='bed' size={18} color='#F28A89' style={{backgroundColor:'#FFE6E7',padding:10,}}  />
                                <Text style={styles.text}>{itemBedrooms} Beds</Text>
                            
                            <FontAwesome5 name='ruler-combined' size={18} color='#F28A89' style={{backgroundColor:'#FFE6E7',padding:10,}}  />
                                <Text style={styles.text}>{itemArea}</Text>
                            <MaterialIcons name='food-fork-drink' size={18} color='#F28A89' style={{backgroundColor:'#FFE6E7',padding:10,}}  />
                                <Text style={styles.text}>{item.kitchens} Kitchens</Text>
                                 </View>
                            <View style={[styles.facilities,{justifyContent:'flex-start'}]}>
                            
                            
                            <MaterialIcons name='bathtub-outline' size={18} color='#F28A89' style={{backgroundColor:'#FFE6E7',padding:10,}}  />
                                <Text style={styles.text}>{item.baths} Baths</Text>
                                 </View>
                            
                
                    </View>
                    <View style={styles.descContainer}>
                        <Text style={[styles.header, { color: '#333333' }]}>Description</Text>
                        <Text style={styles.content}>{itemDesc}</Text>
                    </View>
                    <MakeCall PhoneNo={item.phoneNo} />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Item;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        height: '100%',
    },
    items: {
        fontFamily: 'Poppins-Bold',
    },
    container: {
        flex: 1,
    },
    imageContainer: {
        height: '50%',
        backgroundColor: '#F6F7F9',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    navigation: {
        position: 'absolute',
        top: '8%',
        left: '0%',
        width: '100%',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#ffffff7d',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
    },
    header: {
        fontWeight: 'normal',
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
        color: '#ffff',
    },
    imageTextContainer: {
        position: 'absolute',
        bottom: '0%',
        width: '100%',
        height: '35%',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        // fontWeight: 'normal',
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        color: '#ffff',
    },
    locationContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        // flexDirection: 'row',
        // justifyContent: 'space-between'
        width:"100%",
    },
    priceSection: {
        flexDirection: 'row',
        width:"100%",
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    areaSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // width: '20%',
    },
    facilitiesContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    facilitiesSection: {
        borderRadius: 10,
        // paddingVertical: 10,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
        backgroundColor: '#ffffffff'
    },
    facilities: {
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        // width: '32%',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    text: {
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        marginHorizontal: 5,
    },
    descContainer: {
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    content: {
        paddingTop: 10,
        fontFamily: 'Poppins-Regular',
    },

});
