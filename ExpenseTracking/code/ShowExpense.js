import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import Realm from 'realm';
import { IconButton } from 'react-native-paper';
import { useRealm } from '@realm/react';
import { Expense } from './schema';

const ExpenseList = () => {
    const realm = useRealm();
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const allExpenses = realm.objects('Expense').sorted('date', true);
        setExpenses([...allExpenses]);
    }, [realm]);


    return (
        <View style={styles.container}>
            <FlatList
                data={expenses}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                            <Text style={styles.text}>Date: {item.date.toString()}</Text>
                            
                        <Text style={styles.text}>Amount: {item.amount}</Text>
                        <Text style={styles.text}>Category: {item.category}</Text>
                        <Text style={styles.text}>Note: {item.note}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    
    item: {
        backgroundColor: "#2196F3",
        padding: 20,
        marginVertical: 8,
        borderRadius: 10,
    },
    text: {
        color: 'white',
    },

  
    deleteButton: {
        position: 'absolute',
        right: 0,
        top: 35,
    },
});

export default ExpenseList;