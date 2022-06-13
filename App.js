/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { KeyboardAvoidingView, SafeAreaView } from 'react-native'
import Navigator from './src/navigations/index'
import Home from './src/pages/Home';

const App = () => {
   return(
     <SafeAreaView style={{flex:1,}}> 
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex:1,}}
        keyboardVerticalOffset={0}
      >
        <Navigator/>

      </KeyboardAvoidingView>
        </SafeAreaView>
   )
}

export default App;
