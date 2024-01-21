import React,{useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const HomeScreen  = () => {
    const navigation = useNavigation();


  const handleSignupPress = () => {
   
    navigation.navigate('Signup');
  };
  const handleLoginPress = () => {
    navigation.navigate('Login');
  };    



  useEffect(() => {
    const checkUserData = async () => {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        const email=userData.email;
        navigation.navigate('Profile',{email});
      } else {
        navigation.navigate('Home');
      }
    };
  
    checkUserData();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Superset</Text>

      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.signupButton]} onPress={handleSignupPress}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5', // Set a background color
  },
  title: {
    color: '#3498db', // Set a primary color
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3498db', // Set your desired background color
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff', // Set your desired text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: '#2ecc71', // Customize the color for the signup button
  },
});

export default HomeScreen ;
