import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput, Button, List } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import uuid from 'react-native-uuid';
import { useRealm } from "@realm/react";

const data = [
    { label: 'Salary', value: '1' },
    { label: 'Bonus', value: '2' },
    { label: 'Interest', value: '3' },
    { label: 'Savings interest', value: '4' },
    { label: 'Other', value: '5' },
];

const IncomeInput = ({ onIncomeAdded }) => {
    const realm = useRealm();
    const [value, setValue] = useState(null);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [income, setIncome] = useState({
        id: '',
        amount: '',
        date: new Date(),
        note: '',
        category: null,
    });

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setIncome({ ...income, date: currentDate });
    };

    const showMode = () => {
        setShow(true);
    };

    const saveIncome = () => {
        realm.write(() => {
            realm.create('Income', {
                id: uuid.v4(),
                amount: parseFloat(income.amount),
                date: income.date,
                note: income.note,
                category: income.category,
            });
        })
        console.log('Add income successfully');
        Alert.alert('Successful')
        setIncome({
            id: '',
            amount: '',
            date: new Date(),
            note: '',
            category: null,
        });
        onIncomeAdded();
    }

    return (
        <View style={style.container}>
            <View style={style.containerView}>
                <View style={style.subView}>
                    <Text style={[style.label]}>Date</Text>
                    <Button style={style.input} textColor="black" icon="calendar" mode="elevated" onPress={showMode}>Choose date</Button>
                </View>
                {show && (
                    <DateTimePicker testID="dateTimePicker" value={date} mode="date" is24Hour={true} onChange={onChange} />
                )}

                <View style={style.subView}>
                    <Text style={style.label}>Amount</Text>
                    <TextInput style={style.input} mode="flat" disabled={false} placeholder="0.00" value={income.amount} keyboardType="numeric" onChangeText={(text) => setIncome({ ...income, amount: text })} />

                </View>

                <View style={style.subView}>
                    <Text style={[style.label]}>Note</Text>
                    <TextInput style={style.input} mode="flat" disabled={false} placeholder="Description" value={income.note} onChangeText={(text) => setIncome({ ...income, note: text })} />
                </View>


                <View style={style.subView}>
                    <Text style={[style.label, { justifyContent: 'flex-start', alignSelf: 'flex-start', marginTop: 15 }]}>Category</Text>

                    <Dropdown selectedTextStyle={style.text} placeholderStyle={style.text} style={style.dropdown} data={data} labelField="label" valueField="value" placeholder="Choose Category"
                        value={value} onChange={item => { setValue(item.value); setIncome({ ...income, category: item.label }) }}>
                    </Dropdown>

                </View>

            </View>

            <View style={{ margin: 10 }}>
                <Button icon="content-save" mode="contained" onPress={saveIncome} buttonColor="#1976D2">
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
        width: '25%'
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

export default IncomeInput;