import React, { useCallback, useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import IncomeList from "./ShowIncome";
import ExpenseList from "./ShowExpense";

const Tab = createMaterialTopTabNavigator();

const Transactions = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeSearch, setActiveSearch] = useState("");

    const handleSearch = useCallback(() => {
        setActiveSearch(searchQuery);
    }, [searchQuery]);
    
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput placeholderTextColor="black"
                    style={styles.searchInput}
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <IconButton
                    icon="magnify"
                    onPress={handleSearch}
                />
            </View>
            <Tab.Navigator>
                <Tab.Screen name="Income"  children={() => <IncomeList searchQuery={activeSearch} />} />
                <Tab.Screen name="Expense" children={() => <ExpenseList searchQuery={activeSearch} />} />
            </Tab.Navigator>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
    },
    searchInput: {
        flex: 1,
        marginRight: 10,
        padding: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        color: 'black'
    },
})

export default Transactions;