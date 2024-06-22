import { useRealm } from "@realm/react";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-gesture-handler";
import styles from "../style";

const Logout = ({ navigation }) => {
    const realm = useRealm();
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState({
        name: '',
        phone: '',
        password: ''
    });


    const loadUserData = async () => {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
            const parsedUserData = JSON.parse(userData);
            setUser(parsedUserData);
            setUserId(parsedUserData.userId);
        } else {
            console.log('No user data found');
        }

    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userData');
            navigation.navigate('Login');
        } catch (e) {
            console.error('Failed to logout:', e);
        }
    };

    useEffect(() => {
        loadUserData();
    }, []);

    const updateProfile = () => {
        if (userId) {
            const userToUpdate = realm.objectForPrimaryKey('User', userId);
            if (userToUpdate) {
                realm.write(() => {
                    userToUpdate.name = user.name;
                    userToUpdate.phone = user.phone;
                    userToUpdate.password = user.password;
                    userToUpdate.updatedAt = new Date();
                });
                Alert.alert('Update Successful');
                AsyncStorage.setItem('userData', JSON.stringify(user));
            }
        }
    }
    return (
        <View style={styles.container}>
            {user ? (
                <View>
                    <View>
                        <View style={styles.input} >
                            <Text style={styles.inputLabel}>User Name</Text>
                            <TextInput style={styles.inputControl} value={user.name} onChangeText={(text) => setUser({ ...user, name: text })} />
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Phone</Text>
                            <TextInput style={styles.inputControl} value={user.phone} onChangeText={(text) => setUser({ ...user, phone: text })} />
                        </View>

                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Password</Text>
                            <TextInput style={styles.inputControl} value={user.password} onChangeText={(text) => setUser({ ...user, password: text })} />
                        </View>

                        <View style={styles.formAction}>
                            <TouchableOpacity onPress={updateProfile} >
                                <View style={styles.btn}>
                                    <Text style={styles.btnText}>Update</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ) : (
                <Text>Loading...</Text>
            )}

            <TouchableOpacity onPress={handleLogout} style={{ marginTop: 20 }} >
                <View style={[styles.btn, { backgroundColor: '#f0f0f0' }]}>
                    <Text style={[styles.btnText, { color: '#1E90FF' }]}>Log out</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Logout;