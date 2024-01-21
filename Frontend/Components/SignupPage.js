import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import fetchAPI from '../Tools/FetchAPI';

import CryptoJS from 'react-native-crypto-js';

// Define a secret key
const secretKey = 'hiii';

// Encrypt JSON to string
const encryptJSONToString = (jsonObject) => {
  const jsonString = JSON.stringify(jsonObject);
  const encrypted = CryptoJS.AES.encrypt(jsonString, secretKey).toString();
  return encrypted;
};

// Decrypt string to JSON
const decryptStringToJSON = (encryptedString) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedString, secretKey).toString(CryptoJS.enc.Utf8);
  const decryptedJson = JSON.parse(decrypted);
  return decryptedJson;
};



const SignupPage = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [address, setAddress] = useState('');

  const handleEmailValidation = (email) => {
    const emailRegex = /^\d{4}[a-z]{3}\d{4}@iitrpr\.ac\.in$/;

    if (emailRegex.test(email)) {
      return true
    } else {
     return false;
    }
  };
 
  const handleNameValidation = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (nameRegex.test(name)) {
      return true
    } else {
     return false;
    }
  };


  const handlephoneValidation = (phoneno) => {
    const phoneRegex = /^\d{10}$/;

    if (phoneRegex.test(phoneno)) {
      return true
    } else {
     return false;
    }
  };
   
  const handleAgeValidation = (age) => {
    const ageRegex = /^\d{1,3}$/;

    if (ageRegex.test(age)) {
      return true
    } else {
     return false;
    }
  };
  const handleSignup = async() => {
    // Add your signup logic here
    let data= {
        name: name,
        email: email,
        age: age,
        phone: phoneno,
        address: address
     }

     
     const ncheck= handleNameValidation(name);
     if(ncheck==false)
     {
       console.warn("Invalid Name.")
       return
      }
      
      const acheck= handleAgeValidation(age);
      if(acheck==false)
      {
      console.warn("Invalid Age")
      return
    }
    
    const echeck= handleEmailValidation(email);
    if(echeck==false)
    {
      console.warn("Invalid Email Id.")
      return
    }

    const pcheck= handlephoneValidation(phoneno);
    if(pcheck==false)
    {
      console.warn("Invalid Phone No.")
      return
    }




     const Data = encryptJSONToString(data);

     console.log(Data);

    
     let t={email : email}
     let response = await fetchAPI("http://10.0.2.2:3000/app/check",t,"POST",false);
      
     if(response["present"])
     {
        console.warn("User Already Present")
      }
     else
     {
      t={email:email,data:Data}
      response = await fetchAPI("http://10.0.2.2:3000/app/signup",t,"POST",false);
      if(response.ok){
        console.warn("Data Saved.");
      }
      let k=1
      navigation.navigate('Verification',{email,k});
      console.log('Signing up with:', name, email, age, phoneno, address);
     }
     
    
    //  console.log(decryptStringToJSON(Data))
    


  
  };
   


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#555"
        value={name}
        onChangeText={(text) => setName(text)}
      />

     

      <TextInput
        style={styles.input}
        placeholder="Age"
        placeholderTextColor="#555"
        value={age}
        onChangeText={(text) => setAge(text)}
        keyboardType="numeric"
      />
       <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#555"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />


      <TextInput
        style={styles.input}
        placeholder="Phone no."
        placeholderTextColor="#555"
        value={phoneno}
        onChangeText={(text) => setPhoneno(text)}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor="#555"
        value={address}
        onChangeText={(text) => setAddress(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
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
    color:"black",
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

export default SignupPage;
