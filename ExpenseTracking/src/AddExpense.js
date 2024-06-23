import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput, Button, List } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import uuid from 'react-native-uuid';
import { useRealm } from "@realm/react";


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

const ExpenseInput = ({ onExpenseAdded }) => {
    const realm = useRealm();
    const [value, setValue] = useState(null);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [expense, setExpense] = useState({
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
        setExpense({ ...expense, date: currentDate });
    };

    const showMode = () => {
        setShow(true);
    };

    const saveExpense = async () => {
        if (!expense.amount || !expense.category) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

         realm.write(() => {
            const budget = realm.objects('Budget').filtered(`category == '${expense.category}'`)[0];

            if (budget) {
                budget.remainingAmount -= parseFloat(expense.amount);

            }
            realm.create('Expense', {
                id: uuid.v4(),
                amount: parseFloat(expense.amount),
                date: expense.date,
                note: expense.note,
                category: expense.category,
            });

        })

        console.log('Add expense successfully');
        Alert.alert('Successfully')
        setExpense({
            id: '',
            amount: '',
            date: new Date(),
            note: '',
            category: null,
        });
        onExpenseAdded();
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
                    <TextInput style={style.input} mode="flat" disabled={false} placeholder="0.00" keyboardType="numeric" value={expense.amount} onChangeText={(text) => setExpense({ ...expense, amount: text })} />

                </View>

                <View style={style.subView}>
                    <Text style={[style.label, { justifyContent: 'flex-start' }]}>Note</Text>
                    <TextInput style={style.input} mode="flat" disabled={false} placeholder="Description" value={expense.note} onChangeText={(text) => setExpense({ ...expense, note: text })} />
                </View>


                <View style={style.subView}>
                    <Text style={[style.label, { justifyContent: 'flex-start', alignSelf: 'flex-start', marginTop: 15 }]}>Category</Text>

                    <Dropdown  selectedTextStyle={style.text} placeholderStyle={style.text} style={style.dropdown} data={data} labelField="label" valueField="value" placeholder="Choose Category"
                        value={value} onChange={item => { setValue(item.value); setExpense({ ...expense, category: item.label }) }}>
                    </Dropdown>

                </View>

            </View>

            <View style={{ margin: 10 }}>
                <Button icon="content-save" mode="contained" onPress={saveExpense} buttonColor="#1976D2">
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
        color:'#000',
    },
})
export default ExpenseInput;
