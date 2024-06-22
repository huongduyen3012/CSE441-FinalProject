import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import IncomeList from "./ShowIncome";
import ExpenseList from "./ShowExpense";

const Tab = createMaterialTopTabNavigator();

const Transactions = () => {

    return (
        <Tab.Navigator>
            <Tab.Screen name="Income" component={IncomeList}/>
            <Tab.Screen name="Expense" component={ExpenseList} />
        </Tab.Navigator>
    )
}


export default Transactions;