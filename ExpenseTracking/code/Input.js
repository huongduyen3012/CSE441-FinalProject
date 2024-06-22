import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useState, useEffect } from "react";
import Realm from "realm";
import ExpenseInput from "./AddExpense";
import IncomeInput from "./AddIncome";
import { Income, Expense, Budget } from "./schema";
import { useRealm } from "@realm/react";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

const Input = () => {
    const navigation = useNavigation();
    const realm = useRealm();
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        calculateBalance();
    }, []);

    const calculateBalance = () => {
        const allExpenses = realm.objects('Expense');
        const allIncomes = realm.objects('Income');

        let totalExpenses = 0;
        let totalIncomes = 0;

        allExpenses.forEach(expense => {
            if (expense.id !== '') {
                totalExpenses += parseFloat(expense.amount);
            }
        });

        allIncomes.forEach(income => {
            totalIncomes += parseFloat(income.amount);
        });

        currentBalance = totalIncomes - totalExpenses;
        setBalance(currentBalance);
        navigation.navigate('Home');

    }

    return (
        <Tab.Navigator>
            <Tab.Screen name="Income">{() => <IncomeInput onIncomeAdded={calculateBalance} />}</Tab.Screen>
            <Tab.Screen name="Expense" >{() => <ExpenseInput onExpenseAdded={calculateBalance} />}</Tab.Screen>
        </Tab.Navigator>
    )
}
const style = StyleSheet.create({
    label: {
        paddingRight: 5,
        fontWeight: '600',
        color: 'black',
    },


    text: {
        color: 'black',
        fontSize: 15,
    },

})
export default Input;