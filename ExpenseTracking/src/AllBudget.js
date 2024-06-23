import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput, Modal } from 'react-native';
import { IconButton, Button } from 'react-native-paper';
import { useRealm } from '@realm/react';

const ShowBudget = () => {
    const realm = useRealm();
    const [budget, setBudget] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBudget, setSelectedBudget] = useState(null);
    const [editAmount, setEditAmount] = useState('');

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

    const openModal = (item) => {
        setSelectedBudget(item);
        setEditAmount(item.firstAmount.toString());
        setModalVisible(true);
    };

    const saveEdit = () => {
        const newAmount = parseFloat(editAmount);
        if (isNaN(newAmount) || newAmount <= 0) {
            Alert.alert('Invalid Amount', 'Please enter a valid positive number.');
            return;
        }

        realm.write(() => {
            const difference = selectedBudget.firstAmount - selectedBudget.remainingAmount;
            selectedBudget.firstAmount = newAmount;
            selectedBudget.remainingAmount = Math.max(newAmount - difference, 0);

            if (selectedBudget.remainingAmount > selectedBudget.firstAmount) {
                selectedBudget.remainingAmount = selectedBudget.firstAmount;
            }

            if (selectedBudget.remainingAmount < 0) {
                selectedBudget.remainingAmount = 0;
            }
        });

        setModalVisible(false);
        setSelectedBudget(null);
        setEditAmount('');


        const allBudget = realm.objects('Budget').sorted('date', true);
        setBudget([...allBudget]);
    };


    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => openModal(item)} style={styles.item}>
            <Text style={styles.text}>Date: {item.date.toDateString()}</Text>
            <Text style={styles.text}>Budget: {item.firstAmount}</Text>
            <Text style={styles.text}>Remaining Amount: {item.remainingAmount}</Text>
            <Text style={styles.text}>Category: {item.category}</Text>
            <Text style={styles.text}>Note: {item.note}</Text>

            <IconButton
                icon="trash-can" iconColor='black'
                size={30}
                onPress={() => deleteBudget(item)}
                style={styles.deleteButton}
            />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={budget}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Update Budget</Text>
                        <TextInput
                            style={styles.input}
                            label="Initial Amount"
                            value={editAmount}
                            onChangeText={setEditAmount}
                            keyboardType="numeric"
                        />

                        <View style={{ flexDirection: 'row' }}>
                            <Button textColor='#2196F3' mode="outlined" onPress={() => setModalVisible(false)} style={styles.button}>
                                Cancel
                            </Button>
                            <Button buttonColor='#2196F3' mode="contained" onPress={saveEdit} style={styles.button}>
                                Update
                            </Button>

                        </View>
                    </View>
                </View>
            </Modal>
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

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    input: {
        width: 200,
        marginBottom: 20,
        color: 'black',
        borderWidth: 1,
        borderRadius: 10.
    },
    button: {
        margin: 10,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: 'black',
        fontSize: 17,
    }
});

export default ShowBudget;