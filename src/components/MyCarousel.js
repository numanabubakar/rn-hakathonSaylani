import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons'


const {width: screenWidth} = Dimensions.get('window');

const MyCarousel = props => {
  const [bannerDocs,setBannerDocs]=useState([])
  const carouselRef = useRef(null);


  const BannerData =()=>{
    let array =[]
     
        firestore()
        .collection('Banners')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            const BannerData =documentSnapshot.data()
            array.push(BannerData)
        });
        setBannerDocs(array)
        });
      }
      useEffect(()=>{
        BannerData()
      },[])

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.item} >
        <ParallaxImage
          source={{uri: item.Url}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        
        />
        <Text style={styles.title} numberOfLines={2}>
          {item.Title}
        </Text>
        <View style={{flexDirection:'row',paddingHorizontal:5}}>
          <Ionicons name='location' size={15}/>
          <Text style={{fontFamily:'Poppins-Regular'}}>{item.Location} </Text>
        </View>
        <Text style={{paddingHorizontal:5,fontSize:12,color:'#023047',fontFamily:'Poppins-Bold'}}>Price :{item.Price} PKR</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={bannerDocs}
        renderItem={renderItem}
        hasParallaxImages={true}
        autoplay={true}
        loop={true}
      />
    </View>
  );
};

export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center'
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 120,
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
    fontFamily:'Poppins-Bold',
paddingHorizontal:5,
fontSize:15,
color:'#023047'
  }
});