import { useNavigation } from "@react-navigation/native";
import { useRealm } from "@realm/react";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import uuid from 'react-native-uuid';
import styles from "../style";
import { Button } from "react-native-paper";
import { Alert } from "react-native";

const SignUp = () => {
    const realm = useRealm();
    const navigation = useNavigation();
    const [user, setUser] = useState({
        userId: '',
        name: '',
        phone: '',
        password: '',
        createdAt: new Date(),
        updatedAt: new Date(),
    })


    const handleSignUp = () => {
        const newUser = {
            userId: uuid.v4(),
            name: user.name,
            phone: user.phone,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };

        realm.write(() => {
            realm.create('User', newUser);
        });
        console.log(newUser.userId);
        console.log('Add User successfully');
        Alert.alert('Successful');
        setUser({
            userId: '',
            name: '',
            phone: '',
            password: '',
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.headerImg}
                    source={require('../img/logo.png')}
                    alt="Logo" />

                <Text style={styles.title}>Sign up to Expense Tracking</Text>
                <Text style={styles.subtitle}>
                    Create your account and explore
                </Text>
            </View>
            <View style={styles.form}>

                <View style={styles.input}>
                    <Text style={styles.inputLabel}>User Name</Text>

                    <TextInput autoCorrect={false} keyboardType="default"
                        style={styles.inputControl}
                        value={user.name} onChangeText={(text) => setUser({ ...user, name: text })} />
                </View>


                <View style={styles.input}>
                    <Text style={styles.inputLabel}>Phone number</Text>

                    <TextInput autoCorrect={false}
                        style={styles.inputControl}
                        value={user.phone} onChangeText={(text) => setUser({ ...user, phone: text })} keyboardType="phone-pad" />
                </View>

                <View style={styles.input}>
                    <Text style={styles.inputLabel}>Password</Text>

                    <TextInput secureTextEntry={true} textContentType="password" placeholderTextColor="#6b7280" style={styles.inputControl}
                        value={user.password} onChangeText={(text) => setUser({ ...user, password: text })}
                    />
                </View>

                <View style={styles.formAction}>
                    <TouchableOpacity onPress={handleSignUp} disabled={!user.name || !user.phone || !user.password} >
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>Submit</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default SignUp;