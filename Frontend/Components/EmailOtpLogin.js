// EmailOtpLogin.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import fetchAPI from '../Tools/FetchAPI';
const EmailOtpLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  
  const navigation1 = useNavigation();


  
   
  const handleEmailValidation = (email) => {
    const emailRegex = /^\d{4}[a-z]{3}\d{4}@iitrpr\.ac\.in$/;

    if (emailRegex.test(email)) {
      return true
    } else {
     return false;
    }
  };
  
  // const handleLogin = () => {
  //   // Add your login logic here
  //   console.log('Logging in with email and OTP');

  // };
  const handleLogin = async () => {
    // Perform login logic, validate credentials, etc.

    // If login is successful, send request to the server to trigger email sending
    
    const echeck= handleEmailValidation(email);
    if(echeck==false)
    {
      console.warn("Invalid Email Id.")
      return
    }

    let t={email : email}
    let response = await fetchAPI("http://10.0.2.2:3000/app/check",t,"POST",false);
     
    if(response["present"])
    {
      let k=1;
      navigation1.navigate('Verification', { email ,k});
    }
    else
    {
      console.warn("User Not Present")
    }
    

  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}> Login </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        placeholderTextColor="#555"
        onChangeText={(text) => setEmail(text)}
      />

   

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Send OTP</Text>
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
    backgroundColor: '#f5f5f5',
  },
  title: {
    color: '#3498db',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    color: 'black',
    height: 40,
    width: '100%',
    borderColor: '#3498db',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EmailOtpLogin;
