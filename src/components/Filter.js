import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ScrollView,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { Button ,Text} from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'



const { width: screenWidth } = Dimensions.get('window');

export default function Filter({ navigation }) {

  // const [state, setState] = useState('');
  const [products, setProducts] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [newData, setNewData] = useState('');
  const [isLoading,setIsLoading ]=useState(true)

  
  const handleSearch = (event) => {
  
    setIsFocused(true);
    const data = products;
    const searchData = data.filter((item) => {
      return item.Location.toLowerCase().includes(event.toLowerCase());
    });
    setNewData(searchData);
    
  };
  const ProductData = () => {
    let array = [];
    firestore()
      .collection('Products')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          const BannerData = documentSnapshot.data();
          array.push(BannerData);
        });
        setProducts(array);
        setIsLoading(false)
      });
  };
  useEffect(() => {
    ProductData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View >
         
        <TouchableOpacity style={styles.item}   >
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
              <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Regular' }}> {item.kitchens} Kitchens </Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <FontAwesome5 name='ruler-combined' color='#F28A89' size={15} style={{ backgroundColor: '#FFE6E7', padding: 5, borderRadius: 10, }} />
              <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Regular', marginLeft: 1 }}>  {item.Area}</Text>
            </View>

          </View>

        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Ionicons onPress={() => navigation.goBack()} name="arrow-back-circle" color='#F28a89' size={32}></Ionicons>


          </View>

        </View>
        <View style={{ flexDirection: 'row', paddingHorizontal: 5, alignItems: 'center', justifyContent: 'center' }}>
          <MaterialIcons name='home-search-outline' color='#F28A89' style={{ paddingVertical: 15, paddingHorizontal: 3 }} size={40} />
          <Text variant='titleLarge' style={{ fontFamily: 'Poppins-Bold', textAlign: 'center', paddingVertical: 20 }}>Find  Your House  </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <View style={{ backgroundColor: '#F4F8F9', flexDirection: 'row', borderRadius: 10, width: '83%' }}>
            <Ionicons name='search-outline' size={20} style={{ padding: 10, marginTop: 2 }} />
            <TextInput placeholder='Type Location..' onChangeText={(event) => handleSearch(event)} onPressIn={() => setIsFocused(false)} />
          </View>
          <View style={{ backgroundColor: '#F28a89', width: "15%", padding: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
            <TouchableOpacity >

             
               <Ionicons name={'options-outline'} color="#fff" size={27} />
              
            </TouchableOpacity>
          </View>
        </View>

        {isLoading ?  <View style={{justifyContent:'center',alignItems:'center',flex:1,padding:20}}>
      <ActivityIndicator size='large' color='#F28A89' />
</View> :
        <View style={{ flex: 1 }}>
          <View style={styles.itemContainer}>
            <FlatList style={styles.flatList}
              data={isFocused ? newData : products}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    height: '100%',
    // marginTop: 20,
    backgroundColor: '#fff',
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconContainer: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    // fontWeight: 'normal',
    // fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#030303',
    textAlign: 'center',
  },
  container: {
    // marginTop: 30,
    padding: 20,
    flex: 1,
  },
  filterContainer: {
    paddingTop: 10,
    paddingHorizontal: 25,
    marginTop: 10,
  },
  filterButtonsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterBtn: {
    borderRadius: 10,
    marginRight: 10,
    padding: 2,
  },
  btnLabelStyle: {
    fontFamily: 'Montserrat-Bold',
  },
  priceContainer: {
    marginTop: 10,
  },
  RoomsContainer: {
    marginTop: 20,
  },
  itemContainer: {
    marginVertical: 20,
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: screenWidth - 40,
    height: screenWidth - 100,
    // borderWidth: 1,
    marginBottom: 10,
    borderRadius: 16,
    borderColor: '#333333',
    padding: 5,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 10,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#000000',
    marginVertical: 5,
    fontFamily: 'Montserrat-Bold',
  },
});
