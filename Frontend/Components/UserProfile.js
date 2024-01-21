import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const UserProfile = ({ route }) => {
  const navigation = useNavigation();
  const email = route.params.email;
  const k1 = route.params.k;
  const [userData, setUserData] = useState(k1);

  useEffect(() => {
    const fetchData = async () => {
      let t = { email: email };
      let response = await fetchAPI("http://10.0.2.2:3000/app/login", t, "POST", false);

      const decryptedData = decryptStringToJSON(response["data"]);
      // setUserData(decryptedData);
      AsyncStorage.setItem('userData', JSON.stringify(decryptedData));
      // Store user data in AsyncStorage
      setUserData(decryptedData)

    };

    fetchData();
  }, []);

  useEffect(() => {
   

      if(userData){
          setUserData(userData);
      }
    

   
  }, [userData]);

  const handleLogout = async() => {
    // Remove user data from AsyncStorage on logout
   await AsyncStorage.removeItem('userData');
    navigation.navigate('Home');
  };

  const handleEditProfile = () => {
    navigation.navigate('Edit Profile', { email });
  };
  
 

  return (
    <View style={styles.container}>
      {userData && (
        <View style={styles.card}>
          <Text style={styles.title}>Your Profile</Text>
         <Image style={styles.avatar} source={require('../ben-sweet-2LowviVHZ-E-unsplash.jpg')} />


          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Name:</Text>
            <Text style={styles.fieldValue}>{userData["name"]}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Email:</Text>
            <Text style={styles.fieldValue}>{userData.email}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Age:</Text>
            <Text style={styles.fieldValue}>{userData.age}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Phone:</Text>
            <Text style={styles.fieldValue}>{userData.phone}</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Address:</Text>
            <Text style={styles.fieldValue}>{userData.address}</Text>
          </View>
       
      
          <View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
    <Text style={styles.buttonText}>Edit Profile</Text>
  </TouchableOpacity>
  <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
    <Text style={styles.buttonText}>Logout</Text>
  </TouchableOpacity>
</View>

      </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#3498db', // Background color
  },
  card: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db', // Text color
    marginVertical: 10,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fieldLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50', // Text color
    marginRight: 10,
  },
  fieldValue: {
    fontSize: 18,
    color: '#2c3e50', // Text color
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#e74c3c', // Change to your preferred color for the logout button
  },
});

export default UserProfile;
