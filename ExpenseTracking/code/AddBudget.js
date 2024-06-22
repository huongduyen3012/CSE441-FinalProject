import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import {useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput, Button, List } from "react-native-paper";
import { useRealm } from "@realm/react";
import uuid from 'react-native-uuid';

const data = [
    { label: 'Groceries', value: '1' },
    { label: 'Internet', value: '2' },
    { label: 'Clothing', value: '3' },
    { label: 'Education', value: '4' },
    { label: 'Fuel', value: '5' },
    { label: 'Shopping', value: '6' },
    { label: 'Bar & Coffee', value: '7' },
    { label: 'Books', value: '8' },
    { label: 'Electricity', value: '9' },
    { label: 'Houseware', value: '10' },
    { label: 'Other', value: '11' },
    { label: 'Healthcare', value: '12' },
];


const AddBudget = () => {
    const navigation = useNavigation();
    const realm = useRealm();
    const [value, setValue] = useState(null);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [budget, setBudget] = useState({
        id: '',
        firstAmount: '',
        remainingAmount: '',
        date: new Date(),
        note: '',
        category: null,
    });

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setBudget({ ...budget, date: currentDate });
    };

    const showMode = () => {
        setShow(true);
    };

    const saveBudget = async () => {
        if (!budget.firstAmount || !budget.category) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        realm.write(() => {
            realm.create('Budget', {
                id: uuid.v4(),
                firstAmount: parseFloat(budget.firstAmount),
                remainingAmount: parseFloat(budget.firstAmount),
                date: budget.date,
                note: budget.note,
                category: budget.category,
            });
        })

        console.log('Add expense successfully');
        Alert.alert('Successfully')
        setBudget({
            id: '',
            firstAmount: '',
            remainingAmount: '',
            date: new Date(),
            note: '',
            category: null,
        });
    }

    return (
        <View style={style.container}>
            <View style={style.containerView}>
                <View style={style.subView}>
                    <Text style={[style.label, { justifyContent: 'flex-start' }]}>Date</Text>
                    <Button style={style.input} textColor="black" icon="calendar" mode="elevated" onPress={showMode}>Choose date</Button>
                </View>
                {show && (
                    <DateTimePicker testID="dateTimePicker" value={date} mode="date" is24Hour={true} onChange={onChange} />
                )}

                <View style={style.subView}>
                    <Text style={style.label}>Amount</Text>
                    <TextInput style={style.input} mode="flat" disabled={false} placeholder="0.00" value={budget.firstAmount} keyboardType="numeric" onChangeText={(text) => setBudget({ ...budget, firstAmount: text })} />

                </View>


                <View style={style.subView}>
                    <Text style={[style.label, { justifyContent: 'flex-start' }]}>Note</Text>
                    <TextInput style={style.input} mode="flat" disabled={false} placeholder="Description" value={budget.note} onChangeText={(text) => setBudget({ ...budget, note: text })} />
                </View>


                <View style={style.subView}>
                    <Text style={[style.label, { justifyContent: 'flex-start', alignSelf: 'flex-start', marginTop: 15 }]}>Category</Text>

                    <Dropdown selectedTextStyle={style.text} placeholderStyle={style.text} style={style.dropdown} data={data} labelField="label" valueField="value" placeholder="Choose Category"
                        value={value} onChange={item => { setValue(item.value); setBudget({ ...budget, category: item.label }) }}>
                    </Dropdown>

                </View>

            </View>

            <View style={{ margin: 10 }}>
                <Button icon="clipboard-list" buttonColor="#1976D2" style={{ marginBottom: 10 }} mode="contained" onPress={() => navigation.navigate('BudgetList')}>
                    See Detail
                </Button>
                <Button icon="content-save" mode="contained" buttonColor="#66BB6A" onPress={saveBudget}>
                    Save
                </Button>
            </View>
        </View>
    )

}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },

    containerView: {
        padding: 20,
        backgroundColor: 'white',
        marginTop: 10,
    },

    subView: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },

    label: {
        paddingRight: 5,
        fontWeight: '600',
        color: 'black',
        width: '25%',
    },

    input: {
        borderRadius: 5,
        backgroundColor: "#f0f0f0",
        width: "75%",
        marginBottom: 5,
    },

    text: {
        color: 'black',
        fontSize: 15,
    },

    dropdown: {
        height: 50,
        width: '75%',
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
})
export default AddBudget;