// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Components/HomeScreen';
import EmailOtpLogin from './Components/EmailOtpLogin';
import 'react-native-gesture-handler';
import SignupPage from './Components/SignupPage';
import OTPScreen from './Components/OTPScreen';
import UserProfile from './Components/UserProfile';
import EditProfile from './Components/EditProfile';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={EmailOtpLogin} />
        <Stack.Screen name="Signup" component={SignupPage} />
        <Stack.Screen name="Verification" component={OTPScreen} />
        <Stack.Screen name="Profile" component={UserProfile} />
        <Stack.Screen name="Edit Profile" component={EditProfile} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
