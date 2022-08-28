import React from 'react'
import AuthContextProvider from './src/context/AuthContext'
import AppNavigator from './src/Navigations/AppNavigator'
import Toast from 'react-native-toast-message'

export default function App() {
  return (
    <AuthContextProvider>
      <AppNavigator />
<Toast  ref={ref=>Toast.setRef(ref)}/>

    </AuthContextProvider>
  )
}