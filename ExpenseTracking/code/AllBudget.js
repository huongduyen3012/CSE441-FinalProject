import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useRealm } from '@realm/react';

const ShowBudget = () => {
    const realm = useRealm();
    const [budget, setBudget] = useState([]);

    useEffect(() => {
        const allBudget = realm.objects('Budget').sorted('date', true);
        setBudget([...allBudget]);
    }, [realm]);

    const deleteBudget = (budget) => {
        setBudget(prevBudget => prevBudget.filter(item => item.id !== budget.id));

        realm.write(() => {
            realm.delete(budget);
        });
        console.log('Delete Successful');
    };


    return (
        <View style={styles.container}>
            <FlatList
                data={budget}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.text}>Date: {item.date.toString()}</Text>
                        <Text style={styles.text}>Budget: {item.firstAmount}</Text>
                        <Text style={styles.text}>Remaining Amount: {item.remainingAmount}</Text>
                        <Text style={styles.text}>Category: {item.category}</Text>
                        <Text style={styles.text}>Note: {item.note}</Text>

                        <IconButton
                            icon="trash-can"
                            size={30}
                            onPress={() => deleteBudget(item)}
                            style={styles.deleteButton}
                        />
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

export default ShowBudget;