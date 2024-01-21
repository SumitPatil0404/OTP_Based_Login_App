import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

let sendOTP = async(email)=>
{
    try {
        const response = await fetch('http://10.0.2.2:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email
          }),
        });
  
        const result = await response.json();
        console.log('Login response:', result);
        
        // Handle success or show an error message to the user
        let t=result["OTP"]
        console.log(t+ "OTP");
        return t
      } catch (error) {
        console.error('Error during login:', error);
        // Handle error, show an error message to the user, etc.
      }
}


 



const OTPScreen = ({ route }) => {
  const [otp, setOTP] = useState('');
  const [OTP, setOTP1] = useState(0);
  const [isOtpExpired, setIsOtpExpired] = useState(false);
  const { email } = route.params;  
  const navigation = useNavigation();
 
  useEffect(() => {
    let timer;

    if (!isOtpExpired) {
      // Set a timeout for 5 minutes (adjust the time as needed)
      timer = setTimeout(() => {
        setIsOtpExpired(true);
        console.warn('OTP Expired', 'Please request a new OTP.');
      }, 5*60 * 1000); // 10 minutes in milliseconds
    }

    // Cleanup the timer on component unmount or when OTP expires
    return () => clearTimeout(timer);
  }, [isOtpExpired]);


  useEffect(()=>{
    sendOTP(email).then((k)=>{

        // console.log(k+"dadgfg");
           setOTP1(k);
           
    });
  },[]) 

  const handleVerifyOTP = () => {
    // Implement your OTP verification logic here

  
    console.log('Verifying OTP:', otp ,OTP);
    if (isOtpExpired) {
      console.warn('Error', 'OTP has expired. Please request a new OTP.');
    } 
    else if(OTP==otp)
    {
        console.log("Correct OTP");
        navigation.navigate('Profile',{email});
        
    }
    else
    {
        console.warn("Wrong OTP");
    }
    
  };

  const handleResendOTP = () => {
    setIsOtpExpired(false)
    sendOTP(email).then((k)=>{

       
           setOTP1(k);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        placeholderTextColor="#555"
        keyboardType="numeric"
        value={otp}
        onChangeText={(text) => setOTP(text)}
      />

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOTP}>
        <Text style={styles.verifyButtonText}>Verify OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resendButton} onPress={handleResendOTP}>
        <Text style={styles.resendButtonText}>Resend OTP</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    color: 'black',
    height: 40,
    width: '100%',
    borderColor: '#3498db',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  verifyButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  resendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OTPScreen;
