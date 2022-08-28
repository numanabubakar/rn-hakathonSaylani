/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { TextInput, Button } from 'react-native-paper';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import Toast  from 'react-native-toast-message';


const AddHouse = ({navigation}) => {
  const initialState = {
    Title: '',
    Location: '',
    Price: '',
    Type: '',
    Desc: '',
    NoofBedrooms: '',
    Url: '',
    Area: ''
  }
  const [state, setState] = useState(initialState)
  const [image, setImage] = useState('')
  const [url, setUrl] = useState('');
  const [isProcess, setIsProcess] = useState(false)


  const handleChange = (name, val) => {
    setState(s => ({ ...s, [name]: val }))
  }


  const handleAddHouse = async () => {
setIsProcess(true)
    await storage()
      .ref(`images/${image.fileName}`)
      .putFile(image.uri)
      .then(async () => {
        const url = await storage()
          .ref(`images/${image.fileName}`)
          .getDownloadURL();
        console.log(url);
        setUrl(url);
      })
      .catch(err => {
        console.error(err);
      });
    const { Title, Location, Price, Type, Desc, NoofBedrooms, Area } = state
    const ProductData = {
      Title: Title,
      Location: Location,
      Price: Price,
      Type: Type,
      Desc: Desc,
      NoofBedrooms: NoofBedrooms,
      Url: url,
      Area: Area
    };
    console.log(ProductData);
    firestore()
      .collection('Products')
      .add(ProductData)
      .then(() => {
        console.log('User added!');
        setState({Title: '',
        Location: '',
        Price: '',
        Type: '',
        Desc: '',
        NoofBedrooms: '',
        Url: '',
        Area: ''})
        setIsProcess(false)
        Toast.show({
          type: 'success',
          text1: "Added Product",
          text2: 'Your Product Successully Added',
          position: 'top',
          visibilityTime: 3000,
          bottomOffset: 30,
        })
        navigation.navigate('Home')
      });
  }


  const OpenImageGallery = () => {
    const options = {
      storateOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log("User Cancled Image Picker");
      } else if (response.error) {
        console.log("Image Picker Error => ", response.error);
      } else if (response.customButton) {
        console.log("Image Picker Error => ", response.customButton);
      } else {
        const source = { uri: 'data:image/jpeg;base64' + response.base64 };
        setImage(response.assets[0]);
      }
    })
    alert('Images Gallery is Opened');
  };
  console.log(image)
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.Card}>
        <TouchableOpacity activeOpacity={0.5} onPress={OpenImageGallery}>
          <View style={styles.ImageContainer}>
            {image.fileName === undefined ? 
            <Ionicon name={'camera'} size={90} color={'#F28A89'} />
          :<>
          <Image  source={{uri:image.uri}}/> 
          </>
          }
          </View>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            mode="fill"
            label={'Product Title'}
            onChangeText={(val) => handleChange('Title', val)}
            keyboardType="numbers-and-punctuation"
          />
          <TextInput
            style={styles.input}
            mode="fill"
            label={'Location'}
            onChangeText={(val) => handleChange('Location', val)}
            keyboardType="numbers-and-punctuation"
          />
          <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-between' }}>
            <TextInput
              style={[styles.input, { width: 145 }]}
              mode="fill"
              label={'Price'}
              onChangeText={(val) => handleChange('Price', val)}
              keyboardType="numbers-and-punctuation"

            />
            <TextInput
              style={[styles.input, { width: 145 }]}
              mode="fill"
              onChangeText={(val) => handleChange('Type', val)}
              label={'Property Type'}
              keyboardType="numbers-and-punctuation"

            />
          </View>


          <TextInput
            style={[styles.input,]}
            mode="fill"
            label={'No Of Bedrooms'}
            onChangeText={(val) => handleChange('NoofBedrooms', val)}
            keyboardType="numbers-and-punctuation"

          />
          <TextInput
            style={[styles.input]}
            mode="fill"
            label={'Area'}
            onChangeText={(val) => handleChange('Area', val)}
            keyboardType="numbers-and-punctuation"

          />

          <TextInput
            style={styles.input}
            mode="fill"
            label={'Description'}
            onChangeText={(val) => handleChange('Desc', val)}
            keyboardType="number-and-punctuation"
            multiline={true}
            numberOfLines={4}
          />
          <TouchableOpacity activeOpacity={0.7} onPress={handleAddHouse}>
            <Button mode='contained' buttonColor='#023047' icon="home" style={styles.btn} loading={isProcess}> Add House</Button>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddHouse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  Card: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    borderTopEndRadius: 13,
    borderTopStartRadius: 13,
  },
  ImageContainer: {
    width: 300,
    height: 190,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopEndRadius: 13,
    borderTopStartRadius: 13,
    borderBottomEndRadius: 13,
    borderBottomStartRadius: 13,
  },
  inputContainer: {
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 30,
  },
  input: {
    backgroundColor: '#ffffff',
    marginBottom: 6,
  },
  btn: {
    marginTop: 20,
    marginBottom: 40,
    borderTopEndRadius: 3,
    borderTopStartRadius: 3,
    borderBottomEndRadius: 3,
    borderBottomStartRadius: 3,
  }
});