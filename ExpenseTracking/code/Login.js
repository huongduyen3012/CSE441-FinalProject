import React, { useState } from "react";
import { SafeAreaView, View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "../style";
import { useRealm } from "@realm/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const realm = useRealm();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const user = realm.objects('User').filtered(`phone = "${phone}" AND password = "${password}"`);

    if (user) {
      const userData = user[0];
      try {
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        Alert.alert('Login Successful', 'Welcome!', [{ text: 'OK', onPress: () => navigation.navigate('TabNavigator') }]);
        setPhone('');
        setPassword('');
      } catch (e) {
        console.error('Error saving user ID to AsyncStorage:', e);
      }
    } else {
      Alert.alert('Login Failed', 'Invalid phone number or password.');
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FBFC' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.headerImg}
            source={require('../img/logo.png')}
            alt="Logo" />

          <Text style={styles.title}>Sign in to Expense Tracker</Text>
          <Text style={styles.subtitle}>
            Get access to your account and more
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Phone</Text>

            <TextInput autoCapitalize="none" autoCorrect={false} keyboardType="phone-pad"
              style={styles.inputControl} placeholder="0934324444"
              value={phone} onChangeText={(text) => setPhone(text)} />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>

            <TextInput secureTextEntry={true} textContentType="password" style={styles.inputControl}
              value={password} onChangeText={(text) => setPassword(text)} />
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleLogin} >
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign in</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={{color:'#000', textAlign: 'center' }}>Don't have an account yet?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')} >
              <View style={[styles.btn, { backgroundColor: '#f0f0f0' }]}>
                <Text style={[styles.btnText, { color: '#1E90FF' }]}>Sign up</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};