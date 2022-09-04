import React, { useEffect } from 'react'
import AuthContextProvider from './src/context/AuthContext'
import AppNavigator from './src/Navigations/AppNavigator'
import Toast from 'react-native-toast-message'
import { FavouriteContextProvider } from './src/context/FavouriteContext'
import SplashScreen from 'react-native-splash-screen'
export default function App() {
useEffect(()=>{
  SplashScreen.hide();
},[])

  return (
    <AuthContextProvider>
      <FavouriteContextProvider>

      <AppNavigator />
<Toast />
      </FavouriteContextProvider>
    </AuthContextProvider>
  )
}