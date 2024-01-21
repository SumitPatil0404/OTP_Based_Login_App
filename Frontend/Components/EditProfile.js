// EditProfile.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import fetchAPI from '../Tools/FetchAPI';
import CryptoJS from 'react-native-crypto-js';


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
const EditProfile = ({ route, navigation }) => {
  const email = route.params.email;
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    // Fetch user data based on the email
    const fetchData = async () => {

        let t = { email: email };
        let response = await fetchAPI("http://10.0.2.2:3000/app/login", t, "POST", false);
  
    
     
      const decryptedUserData = decryptStringToJSON(response.data);
      setUserData(decryptedUserData);

      // Pre-fill the form fields with existing data
      setName(decryptedUserData.name);
      setAge(decryptedUserData.age);
      setPhone(decryptedUserData.phone);
      setAddress(decryptedUserData.address);
    };

    fetchData();
  }, []);


  const handleSaveChanges = () => {
    // Add logic to save changes, such as updating user data on the server
    // For example: send a request to update user data

    // After saving changes, navigate back to the UserProfile page
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
   
  
   const pcheck= handlephoneValidation(phone);
   if(pcheck==false)
   {
     console.warn("Invalid Phone No.")
     return
   }



    let k= {
        name: name,
        email: email,
        age: age,
        phone: phone,
        address: address
     }
    const fetchData = async () => {
        console.log("details "+k.name)
        let k1=encryptJSONToString(k);
        let t = { email: email,data:k1 };
        let response = await fetchAPI("http://10.0.2.2:3000/app/editdata", t, "POST", false);
         console.log(response.ok)
        // console.log(decryptStringToJSON(response["data"]));
        // setUserData(decryptStringToJSON(response["data"]));
      };
      fetchData();
      navigation.navigate("Profile",{email,k})
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Edit Profile</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          placeholderTextColor="#555"
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
          placeholder="Phone"
          value={phone}
          placeholderTextColor="#555"
          onChangeText={(text) => setPhone(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor="#555"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />

        <Button title="Save Changes" onPress={handleSaveChanges} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#3498db',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 20,
  },
  input: {
    color: 'black',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});

export default EditProfile;
