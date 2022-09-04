/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { TextInput, Button } from 'react-native-paper';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import SelectList from 'react-native-dropdown-select-list'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const AddHouse = ({ navigation }) => {
  const initialState = {
    Title: '',
    Location: '',
    Price: '',
    Desc: '',
    NoofBedrooms: '',
    Url: '',
    Area: '',
    kitchens: '',
    baths: '',
    phoneNo: ''
  }
  const [state, setState] = useState(initialState)
  const [image, setImage] = useState('')
  const [isProcess, setIsProcess] = useState(false)
  const [propertyType, setPropertyType] = useState("");
  const data = [
    { value: 'For Sale' },
    { value: 'For Rent' },
    { value: 'Appartments' },
    { value: 'Hotel Room' },
  ];
  // console.log(url);
  const handleChange = (name, val) => {
    setState(s => ({ ...s, [name]: val }))
  }


  const handleAddHouse = async () => {
    setIsProcess(true)

    if (!image) {
setIsProcess(false)
      Toast.show({
        type: 'error',
        text1: "IMAGE ERROR",
        text2: 'Please Add Image',
        position: 'top',
        visibilityTime: 3000,
        bottomOffset: 30
      })
    }




    await storage()
      .ref(`images/${image.fileName}`)
      .putFile(image.uri)
      .then(async () => {
        const imageUrl = await storage()
          .ref(`images/${image.fileName}`)
          .getDownloadURL();
        // console.log(imageUrl);
        AddProductData(imageUrl)
      })
      .catch(err => {
        console.error(err);
      });

  }

  const AddProductData = (imageUrl) => {

    const { Title, Location, Price, Desc, NoofBedrooms, Area, kitchens, baths, phoneNo } = state

if(!imageUrl){
  setIsProcess(false)
  return(

    Toast.show({
      type: 'error',
      text1: "IMAGE ERROR",
      text2: 'Please Add Image',
      position: 'top',
      visibilityTime: 3000,
      bottomOffset: 30
    })
    )
}
else if(!Title){
  setIsProcess(false)
  return(

    Toast.show({
      type: 'error',
      text1: "TITLE ERROR",
      text2: 'Please Add Title',
      position: 'top',
      visibilityTime: 3000,
      bottomOffset: 30
    })
    )
}
else if(!Location){
  setIsProcess(false)
  return(

    Toast.show({
      type: 'error',
      text1: "LOCATION ERROR",
      text2: 'Please Add Location',
      position: 'top',
      visibilityTime: 3000,
      bottomOffset: 30
    })
    )
}
else if(!Price){
  setIsProcess(false)
  return(

    Toast.show({
      type: 'error',
      text1: "PRICE ERROR",
      text2: 'Please Add Price',
      position: 'top',
      visibilityTime: 3000,
      bottomOffset: 30
    })
    )
}
else if(!Desc){
  setIsProcess(false)
  return(

    Toast.show({
      type: 'error',
      text1: "DESCRIPTION ERROR",
      text2: 'Please Add Description',
      position: 'top',
      visibilityTime: 3000,
      bottomOffset: 30
    })
    )
}
else if(!NoofBedrooms){
  setIsProcess(false)
  return(

    Toast.show({
      type: 'error',
      text1: "BEDROOMS ERROR",
      text2: 'Please Add Bedrooms',
      position: 'top',
      visibilityTime: 3000,
      bottomOffset: 30
    })
    )
}
else if(!Area){
  setIsProcess(false)
  return(

    Toast.show({
      type: 'error',
      text1: "AREA ERROR",
      text2: 'Please Add Area',
      position: 'top',
      visibilityTime: 3000,
      bottomOffset: 30
    })
    )
}
else if(!kitchens){
  setIsProcess(false)
  return(

    Toast.show({
      type: 'error',
      text1: "KITCHENS ERROR",
      text2: 'Please Add kitchens',
      position: 'top',
      visibilityTime: 3000,
      bottomOffset: 30
    })
    )
}
else if(!baths){
  setIsProcess(false)
  return(

    Toast.show({
      type: 'error',
      text1: "BATHS ERROR",
      text2: 'Please Add Baths',
      position: 'top',
      visibilityTime: 3000,
      bottomOffset: 30
    })
    )
}
else if(!phoneNo || phoneNo.length < 10){
  setIsProcess(false)
  return(

    Toast.show({
      type: 'error',
      text1: "CONTACT NUMBER ERROR",
      text2: 'Contact Number Must be 11 Digits',
      position: 'top',
      visibilityTime: 3000,
      bottomOffset: 30
    })
    )
}

    const id = Math.random().toString(36).slice(2)
    const ProductData = {
      Title: Title,
      Location: Location,
      Price: Price,
      Type: propertyType,
      Desc: Desc,
      NoofBedrooms: NoofBedrooms,
      Url: imageUrl,
      Area: Area,
      uid: id,
      Kitchens: kitchens,
      Baths: baths,
      phoneNo: phoneNo

    };
    // console.log(ProductData);
    firestore()
      .collection('Products')
      .add(ProductData)
      .then(() => {
        // console.log('User added!');
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
  // console.log(image)
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.Card}>
        <TouchableOpacity activeOpacity={0.5} onPress={OpenImageGallery}>
          <View style={styles.ImageContainer}>
            {image.fileName === undefined ?
              <Ionicon name={'camera'} size={90} color='#F28A89' />
              : <>
                <Image source={{ uri: image.uri }} style={{
                  width: 300,
                  height: 190, borderRadius: 10
                }} />
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
            activeUnderlineColor='#F28A89'
            activeOutlineColor='#F28A89'
            placeholderTextColor='#F28A89'
            left={<TextInput.Icon name='format-title' color='#F28A89' />}
          />
          <TextInput
            style={styles.input}
            mode="fill"
            label={'Location'}
            onChangeText={(val) => handleChange('Location', val)}
            keyboardType="numbers-and-punctuation"
            left={<TextInput.Icon name='google-maps' color='#F28A89' />}
            activeUnderlineColor='#F28A89'
            activeOutlineColor='#F28A89'
            placeholderTextColor='#F28A89'
          />
          {/* <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-between' }}> */}
          <TextInput
            style={[styles.input,]}
            mode="fill"
            label={'Price'}
            left={<TextInput.Icon name='cash' color='#F28A89' />}
            onChangeText={(val) => handleChange('Price', val)}
            keyboardType="numbers-and-punctuation"
            activeUnderlineColor='#F28A89'
            activeOutlineColor='#F28A89'
            placeholderTextColor='#F28A89'
          />
          {/* <TextInput
              style={[styles.input,]}
              mode="fill"
              onChangeText={(val) => handleChange('Type', val)}
              label={'Property Type'}
              left={<TextInput.Icon  name='greenhouse' color='#F28A89'/>}
              keyboardType="numbers-and-punctuation"
              activeUnderlineColor='#F28A89'
              activeOutlineColor='#F28A89'
              placeholderTextColor='#F28A89' */}
          {/* /> */}
          <View style={{ flexDirection: 'row', backgroundColor: '#fff', marginBottom: 5, borderBottomWidth: 1, borderBottomColor: '#0008' }}>
            <MaterialCommunityIcons name='greenhouse' style={{ padding: 10 }} size={25} color='#000' />
            <SelectList
              // onSelect={() => alert(propertyType)}
              placeholder='Property Type'
              setSelected={setPropertyType}
              data={data}
              search={false}
              dropdownStyles={{ backgroundColor: '#fff', borderRadius: 0, borderWidth: 0, marginBottom: 5, marginTop: 0, width: '78%' }}
              boxStyles={{ borderRadius: 3, backgroundColor: '#FFF', marginBottom: 5, borderWidth: 0, width: '78%', fontFamily: 'Poppins-Bold' }} //override default styles
            />
          </View>

          <TextInput
            style={[styles.input,]}
            mode="fill"
            label={'No Of Bedrooms'}
            onChangeText={(val) => handleChange('NoofBedrooms', val)}
            keyboardType="number-pad"
            activeUnderlineColor='#F28A89'
            left={<TextInput.Icon name='bed' />}
            activeOutlineColor='#F28A89'
            placeholderTextColor='#F28A89'
          />
          <View style={{ flexDirection: 'row' }}>

            <TextInput
              style={[styles.input, { width: '50%' }]}
              mode="fill"
              label={'Baths'}
              onChangeText={(val) => handleChange('baths', val)}
              keyboardType="number-pad"
              activeUnderlineColor='#F28A89'
              left={<TextInput.Icon name='bathtub-outline' />}
              activeOutlineColor='#F28A89'
              placeholderTextColor='#F28A89'
            />
            <TextInput
              style={[styles.input, { width: '48%', marginLeft: 5 }]}
              mode="fill"
              label={'Kitchens'}
              onChangeText={(val) => handleChange('kitchens', val)}
              keyboardType="number-pad"
              activeUnderlineColor='#F28A89'
              left={<TextInput.Icon name='food-fork-drink' />}
              activeOutlineColor='#F28A89'
              placeholderTextColor='#F28A89'
            />
          </View>
          <TextInput
            style={[styles.input]}
            mode="fill"
            label={'Area'}
            onChangeText={(val) => handleChange('Area', val)}
            keyboardType="numbers-and-punctuation"
            left={<TextInput.Icon name='set-square' />}
            activeUnderlineColor='#F28A89'
            activeOutlineColor='#F28A89'
            placeholderTextColor='#F28A89'
          />
          <TextInput
            style={[styles.input]}
            mode="fill"
            label={'Contact No'}
            onChangeText={(val) => handleChange('phoneNo', val)}
            keyboardType='number-pad'
            left={<TextInput.Icon name='phone-outgoing' />}
            activeUnderlineColor='#F28A89'
            activeOutlineColor='#F28A89'
            placeholderTextColor='#F28A89'
          />

          <TextInput
            style={styles.input}
            mode="fill"
            label={'Description'}
            onChangeText={(val) => handleChange('Desc', val)}
            keyboardType="number-and-punctuation"
            left={<TextInput.Icon name='file-document-outline' />}
            multiline={true}
            numberOfLines={4}
            activeUnderlineColor='#F28A89'
            activeOutlineColor='#F28A89'
            placeholderTextColor='#F28A89'

          />
          <TouchableOpacity activeOpacity={0.7} onPress={handleAddHouse}>
            <Button mode='contained' disabled={isProcess} buttonColor='#F28A89' icon="home" style={styles.btn} loading={isProcess}> Post House For Sale</Button>
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
    fontFamily: 'Poppins-Regular'
  },
  btn: {
    marginTop: 20,
    marginBottom: 40,
    borderTopEndRadius: 3,
    borderTopStartRadius: 3,
    borderBottomEndRadius: 3,
    borderBottomStartRadius: 3,
    fontFamily: 'Poppins-Regular'

  }
});