import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useAuthContext } from '../context/AuthContext'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/Auth/Login'
import Register from '../screens/Auth/Register'
import ForgetPassword from '../screens/Auth/ForgetPassword'
import Home from '../screens/Frontend/Home/Home'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import UserAccount from '../screens/Frontend/UserAccount/UserAccount'
import WishList from '../screens/Frontend/WishList/WishList'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createDrawerNavigator,DrawerItemList,DrawerContentScrollView, } from '@react-navigation/drawer'
import AddHouse from '../components/AddHouse'
import Houses from '../screens/Frontend/Products/Houses'


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()
export default function AppNavigator() {


  const MyTabs = () => {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: { backgroundColor: '#FFE6E7' }, tabBarActiveTintColor: '#F28A89' }}>
        <Tab.Screen name='Home2' component={Home}
          options={{ tabBarIcon: ({ focused, color, size }) => <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} /> }}
        />
        <Tab.Screen name='House'
          options={{ tabBarIcon: ({ focused, color, size }) => <Ionicons name={focused ? 'bed' : 'bed-outline'} size={size} color={color} /> }}
          component={Houses} />
        <Tab.Screen name='WishList'
          component={WishList}
          options={{
            tabBarIcon: ({ focused, color, size }) => <Ionicons name={focused ? 'heart' : 'heart-outline'} size={size} color={color} />
            ,
            tabBarBadge: 4
          }}
        />
      </Tab.Navigator>
    )
  }


  const MyDrawer = () => {
    return (
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerTitleAlign: 'left',
          drawerActiveTintColor: '#FF5B2D', headerShown: false, drawerLabelStyle: { marginLeft: -25, fontFamily: 'Roboto-Medium', fontSize: 15 }
        }}>
        <Drawer.Screen name="Home"
          component={MyTabs}
          options={{ drawerIcon: ({ focused, color, size }) => <Ionicons size={22} name={focused ? 'home' : 'home-outline'} color={color} /> }}
        />

        <Drawer.Screen name="Profile" component={UserAccount}
          options={{ drawerIcon: ({ focused, color, size }) => <Ionicons size={22} name={focused ? 'person' : 'person-outline'} color={color} /> }}
        />
        <Drawer.Screen name="Favourite" component={WishList}
          options={{ drawerIcon: ({ focused, color, size }) => <Ionicons size={22} name={focused ? 'settings' : 'settings-outline'} color={color} /> }}
        />
        <Drawer.Screen name="Add House" component={AddHouse}
          options={{ drawerIcon: ({ focused, color, size }) => <Ionicons size={22} name={focused ? 'add-circle' : 'add-circle-outline'} color={color} /> }}
        />

      </Drawer.Navigator>
    );
  }


  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props} style={{ margin: 0, padding: 0 }}>
        <View style={{ height: 150, flex: 1, alignItems: 'flex-start', justifyContent: 'center', margin: 0, padding: 0, borderBottomWidth: 2, borderBottomColor: 'grey' }}>
          <View style={{ padding: 10, }}>
            <Ionicons  name='person-circle-outline' size={70} />
            <Text > user.emai</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
        
      </DrawerContentScrollView>
    );
  }


  const { isAuthenticated } = useAuthContext()
  return (
    <NavigationContainer >
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >

        {isAuthenticated
          ?
          <Stack.Group>
            <Stack.Screen name='FrontEnd' component={MyDrawer} />
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