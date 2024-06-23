import { useRealm } from "@realm/react";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-gesture-handler";
import styles from "../style";

const EditAccount = ({ navigation }) => {
    const realm = useRealm();
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState({
        name: '',
        phone: '',
        password: '', 
        createdAt: '',
    });


    const loadUserData = async () => {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
            const parsedUserData = JSON.parse(userData);
            parsedUserData.createdAt = new Date(parsedUserData.createdAt).toDateString();
            setUser(parsedUserData);
            setUserId(parsedUserData.userId);
        } else {
            console.log('No user data found');
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
                    userToUpdate.createdAt = user.createdAt;
                    userToUpdate.updatedAt = new Date();
                });
                Alert.alert('Update Successful');
                AsyncStorage.setItem('userData', JSON.stringify(user));
                navigation.goBack();

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

                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Created At</Text>
                            <TextInput style={[styles.inputControl, {backgroundColor: '#f0f0f0'}]} value={user.createdAt} editable={false} />
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
        </View>
    )
}

export default EditAccount;