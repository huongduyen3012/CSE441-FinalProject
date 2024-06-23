import { useRealm } from "@realm/react";
import React, { useState, useLayoutEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-gesture-handler";
import styles from "../style";
import { IconButton } from "react-native-paper";

const Logout = ({ navigation }) => {
    const [user, setUser] = useState(null);

    const loadUserData = useCallback(async () => {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
            const parsedUserData = JSON.parse(userData);
            parsedUserData.createdAt = new Date(parsedUserData.createdAt).toDateString();
            parsedUserData.updatedAt = new Date(parsedUserData.updatedAt).toDateString();
            setUser(parsedUserData);
        } else {
            console.log('No user data found');
        }

    },[]);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userData');
            navigation.navigate('Login');
        } catch (e) {
            console.error('Failed to logout:', e);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadUserData();
        }, [loadUserData])
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButton icon="account-edit" size={30} iconColor="black"
                    onPress={() => navigation.navigate('Edit User')}
                    style={{ marginRight: 15 }}
                />

            ),
        });
    }, [navigation, loadUserData]);

    return (
        <View style={styles.container}>
            {user ? (
                <View>
                    <View>
                        <View style={styles.input} >
                            <Text style={styles.inputLabel}>User Name</Text>

                            <TextInput style={[styles.inputControl, { backgroundColor: '#f0f0f0' }]} value={user.name} editable={false} />
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Phone</Text>
                            <TextInput style={[styles.inputControl, { backgroundColor: '#f0f0f0' }]} value={user.phone} editable={false} />
                        </View>

                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Password</Text>
                            <TextInput style={[styles.inputControl, { backgroundColor: '#f0f0f0' }]} value={user.password} editable={false} />
                        </View>

                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Created At</Text>
                            <TextInput style={[styles.inputControl, { backgroundColor: '#f0f0f0' }]} value={user.createdAt} editable={false} />
                        </View>

                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>Updated At</Text>
                            <TextInput style={[styles.inputControl, { backgroundColor: '#f0f0f0' }]} value={user.updatedAt} editable={false} />
                        </View>
                    </View>
                </View>
            ) : (
                <Text>Loading...</Text>
            )}

            <TouchableOpacity onPress={handleLogout} style={{ marginTop: 20 }} >
                <View style={[styles.btn, { backgroundColor: '#1E90FF' }]}>
                    <Text style={styles.btnText}>Log out</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Logout;