import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useAuthContext } from '../context/AuthContext'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {Avatar } from 'react-native-paper'
import Login from '../screens/Auth/Login'
import Register from '../screens/Auth/Register'
import ForgetPassword from '../screens/Auth/ForgetPassword'
import Home from '../screens/Frontend/Home/Home'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import UserAccount from '../screens/Frontend/UserAccount/UserAccount'
import WishList from '../screens/Frontend/WishList/WishList'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView, } from '@react-navigation/drawer'
import AddHouse from '../components/AddHouse'
import Houses from '../screens/Frontend/Products/Houses'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import ScreenLoader from '../components/ScreenLoader'
import Filter from '../components/Filter'
import Item from '../components/Item'
import { useFavContext } from '../context/FavouriteContext'
import RentHouse from '../screens/Frontend/Products/RentHouse'
import Appartments from '../screens/Frontend/Products/Appartments'
import HotelRoom from '../screens/Frontend/Products/HotelRoom'


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()
export default function AppNavigator() {

  const { user, dispatch } = useAuthContext()
  const { favHouses } = useFavContext();

  const MyTabs = () => {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: { backgroundColor: '#FFE6E7' }, tabBarActiveTintColor: '#F28A89' }}>
        <Tab.Screen name='Home2' component={Home}
          options={{ tabBarIcon: ({ focused, color, size }) => <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} /> }}
        />
        <Tab.Screen name='AddHouse'
          options={{ tabBarIcon: ({ focused, color, size }) => <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} size={35} color={color} />  }}
          component={AddHouse}
           />
        <Tab.Screen name='Favourite'
          component={WishList}
          options={{
            tabBarIcon: ({ focused, color, size }) => <Ionicons name={focused ? 'heart' : 'heart-outline'} size={size} color={color} />
            ,
            tabBarBadge: favHouses.length
          }}
        />
        {/* <Tab.Screen name='Houses'
          component={Houses}
          options={{
           tabBarIcon:null
          }}
        /> */}
      </Tab.Navigator>
    )
  }


  const MyDrawer = () => {
    return (
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerTitleAlign: 'left',
          drawerInactiveTintColor: '#023047',
          drawerActiveTintColor: '#F28A89', headerShown: false, drawerLabelStyle: { marginLeft: -25, fontFamily: 'Poppins-Regular', fontSize: 15 }
        }}>
        <Drawer.Screen name="Home"
          component={MyTabs}
          options={{ drawerIcon: ({ focused, color, size }) => <Ionicons size={22} name={focused ? 'home' : 'home-outline'} color={color} /> }}
        />

        <Drawer.Screen name="Profile" component={UserAccount}
          options={{ drawerIcon: ({ focused, color, size }) => <Ionicons size={22} name={focused ? 'person' : 'person-outline'} color={color} /> }}
        />
        <Drawer.Screen name="Favourite" component={WishList}
          options={{ drawerIcon: ({ focused, color, size }) => <Ionicons size={22} name={focused ? 'heart' : 'heart-outline'} color={color} /> }}
        />
        <Drawer.Screen name="Rent" component={RentHouse}
          options={{ drawerIcon: ({ focused, color, size }) => <Ionicons size={22} name={focused ? 'key' : 'key-outline'} color={color} /> ,
        drawerLabel:'Rent Houses'}}
        />
        <Drawer.Screen name="sale" component={Houses}
          options={{ drawerIcon: ({ focused, color, size }) => <MaterialIcons size={22} name={focused ? 'home-export-outline' : 'home-export-outline'} color={color} /> ,
        drawerLabel:'For Sale'}}
        />
        <Drawer.Screen name="Apparts" component={Appartments}
          options={{ drawerIcon: ({ focused, color, size }) => <MaterialIcons size={22} name={focused ? 'home-city' : 'home-city-outline'} color={color} /> ,
        drawerLabel:'Appartments'}}
        />
        <Drawer.Screen name="Hotels" component={HotelRoom}
          options={{ drawerIcon: ({ focused, color, size }) => <FontAwesome5 size={22} name={focused ? 'hotel' : 'hotel'} color={color} /> ,
        drawerLabel:'Hotel Rooms'}}
        />


      </Drawer.Navigator>
    );
  }


  function CustomDrawerContent(props) {
    return (
      <View style={{ flex: 1, }}>

        <DrawerContentScrollView {...props} style={{ margin: 0, padding: 0 }} showsVerticalScrollIndicator={false}>
          <View style={{ height: 110, width: '100%', borderBottomWidth: 1, borderBottomColor: '#ccc', }}>
            <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <Avatar.Icon icon='account-circle-outline' color='#fff' style={{backgroundColor:'#f28a89'}}    ></Avatar.Icon>
              <View>
                <Text style={{ fontFamily: 'Poppins-Bold' ,marginLeft:5}}> {user.fullName}</Text>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 10,marginLeft:5 }}> {user.email}</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, backgroundColor: "#fff", }}>

            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>
        <View style={{ padding: 20, alignItems: 'flex-start', borderTopWidth: 1, borderColor: "#ccc", }}>
          <TouchableOpacity style={{ paddingVertical: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name='share-social-outline' color={'#023047'} size={22} />
              <Text style={{ fontSize: 15, marginLeft: 5, fontFamily: 'Poppins-Regular',color:'#023047' }}>Tell a Friend</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingVertical: 15 }} onPress={HandleLogout}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name='exit-outline' color={"#023047"} size={22} />
              <Text style={{ fontSize: 15, marginLeft: 5, fontFamily: 'Poppins-Regular',color:'#023047' }}>Sign Out</Text>
            </View>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
  const HandleLogout = () => {

    Alert.alert(
      "Are You Sure ?",
      "Your Account Will be Sign Out!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Sign Out", onPress: () => {
            return (auth().signOut()
              .then(() => {
                dispatch({ type: "LOGOUT" })
                Toast.show({
                  type: 'success',
                  text1: "Sign Out Successfuly",
                  position: 'top',
                  visibilityTime: 2000,
                  bottomOffset: 30

                })
              })
              .catch((err) => {
                console.error(err)
                alert("Something went wrong")
              }))
          },
        }
      ],

    );


  }

  const { isAuthenticated, isProcessing } = useAuthContext()

  if (isProcessing) {
    return <ScreenLoader />
  }
  return (
    <NavigationContainer >
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >

        {isAuthenticated
          ?
          <Stack.Group>
            <Stack.Screen name='FrontEnd' component={MyDrawer} />
            <Stack.Screen name='ItemDetail' component={Item} />
            <Stack.Screen name='Houses' component={Houses} />
            <Stack.Screen name='RentHouses' component={RentHouse} />
            <Stack.Screen name='HotelRooms' component={HotelRoom} />
            <Stack.Screen name='Appartments' component={Appartments} />
            <Stack.Screen name='Filter' component={Filter} />
            
          </Stack.Group> :
          <Stack.Group>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='ForgetPassword' component={ForgetPassword} />
          </Stack.Group>
        }
      </Stack.Navigator>

    </NavigationContainer>
  )
}