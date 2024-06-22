import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Button, IconButton } from "react-native-paper";
import PieChart from "react-native-pie-chart";
import { useQuery, useRealm } from "@realm/react";

const HomeScreen = ({ navigation }) => {

    const expenses = useQuery("Expense");
    const incomes = useQuery("Income");
    const totalExpense = expenses.sum("amount");
    const totalIncome = incomes.sum("amount");
    const balance = totalIncome - totalExpense;

    const [isBalanceVisible, setIsBalanceVisible] = useState(true);

    const renderHeader = () => {
        return (
            <View style={styles.viewHeader}>
                <View style={{ backgroundColor: '#2196F3', borderRadius: 10, padding: 10 }}>
                    <Text style={styles.subtitleHome}>Total balance</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'white', fontSize: 27, fontWeight: 'bold' }}>
                            {isBalanceVisible ? `${balance}đ` : '******'}</Text>
                        <IconButton iconColor="white" style={{ paddingBottom: 20 }}
                            icon={isBalanceVisible ? 'eye' : 'eye-off'}

                            size={20}
                            onPress={() => setIsBalanceVisible(!isBalanceVisible)}
                        />
                    </View>

                </View>
            </View>
        )
    };

    const renderChartSection = () => {
        if (totalExpense === 0 && totalIncome === 0) {
            return (
                <View style={styles.viewChartHeader}>
                    <Text style={{ color: 'black', fontSize: 17 }}> No expenses or income to display</Text>
                </View>
            );
        }
        const total = totalExpense + totalIncome;
        const expensePercentage = (totalExpense / total) * 100;
        const incomePercentage = (totalIncome / total) * 100;

        return (
            <View style={styles.viewChartHeader}>
                <View>
                    <Text style={{ color: 'black', fontSize: 17 }}>Expense vs Income</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', margin: 10 }}>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <PieChart widthAndHeight={150} series={[expensePercentage, incomePercentage]}
                            sliceColor={["#F44336", "#4CAF50"]} coverFill={"#fff"}
                            coverRadius={0.5} />

                        <View style={{ width: 1, height: '100%', backgroundColor: 'grey', marginLeft: 15 }} />

                        <View style={styles.chartNoteContainer}>
                            <View style={[styles.chartContainer, { flex: 1 }]}>
                                <View style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 5, marginTop: 5,
                                    backgroundColor: '#4CAF50'
                                }} />

                                <View style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 5,
                                    backgroundColor: 'red', marginTop: 5,
                                }} />
                                <Text style={{ color: '#000' }}></Text>
                            </View >

                            <View style={[styles.chartContainer]}>
                                <Text style={{ color: '#000' }}>Income</Text>
                                <Text style={{ color: '#000' }}>Expense</Text>
                                <Text style={{ color: '#000' }}></Text>
                            </View >
                            <View style={[styles.chartContainer, { alignItems: 'flex-end' }]}>
                                <Text style={{ color: '#4CAF50', }}>{totalIncome}đ</Text>
                                <Text style={{ color: 'red', }}>{totalExpense}đ</Text>
                                <Text style={{ color: '#000', }}>{balance}đ</Text>
                            </View>
                        </View>

                    </View>

                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', marginLeft: 170, marginTop: 30 }}>
                            <Text style={{ color: '#2196F3' }} >Transaction history</Text>
                            <IconButton
                                icon="chevron-right" iconColor="#2196F3"
                                size={20}
                                onPress={() => navigation.navigate('Transaction')}
                            />
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    const renderBudget = () => {

        return (
            <View style={styles.viewChartHeader}>

                <View>
                    <Text style={{ color: 'black', fontSize: 17 }}>Budget</Text>
                    <View style={{ marginLeft: 10, marginTop: 5 }}>
                        <Text style={{ color: '#000', fontSize: 15, textAlign: 'center' }}>Create and manage your budget for different categories</Text>
                    </View>
                    <View>
                        <Button icon="plus" onPress={() => navigation.navigate('Budget')} textColor="#2196F3">
                            Add new
                        </Button>
                    </View>

                </View>


            </View>
        )
    }

    const renderRecentTransactions = () => {
        const recentTransactions = [...expenses, ...incomes]
            .sort((a, b) => b.date - a.date)
            .slice(0, 5);

        return (
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.cardTitle}>Recent Transactions</Text>
                    {recentTransactions.map((transaction, index) => (
                        <View key={index} style={styles.transactionItem}>
                            <Icon
                                name={transaction.schema.name === 'Expense' ? 'arrow-down-circle' : 'arrow-up-circle'}
                                size={24}
                                color={transaction.schema.name === 'Expense' ? '#F44336' : '#4CAF50'}
                            />
                            <View style={styles.transactionDetails}>
                                <Text style={styles.transactionCategory}>{transaction.category}</Text>
                                <Text style={styles.transactionDate}>
                                    {transaction.date.toLocaleDateString()}
                                </Text>
                            </View>
                            <Text
                                style={[
                                    styles.transactionAmount,
                                    { color: transaction.schema.name === 'Expense' ? '#F44336' : '#4CAF50' }
                                ]}
                            >
                                {transaction.schema.name === 'Expense' ? '-' : '+'}
                                {transaction.amount.toFixed(2)}đ
                            </Text>
                        </View>
                    ))}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Transaction')}
                        style={styles.viewAllButton}
                    >
                        <Text style={styles.viewAllText}>View All Transactions</Text>
                        <Icon name="chevron-right" size={24} color="#2196F3" />
                    </TouchableOpacity>
                </Card.Content>
            </Card>
        )
    }
    const renderOtherInfor = () => {
        return (
            <View style={styles.viewChartHeader}>

                <View>
                    <Text style={{ color: 'black', fontSize: 17 }}>Money lent/borrowed</Text>
                    <View style={{ marginTop: 5 }}>
                        <Text style={{ color: '#000', fontSize: 15 }}>You have no Loan or Debt at present</Text>
                    </View>

                </View>


            </View>
        )
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#f0f0f0' }} >

            {renderHeader()}

            {renderChartSection()}

            {renderBudget()}

            {renderOtherInfor()}

        </ScrollView>
    )
};

const styles = StyleSheet.create({
    viewHome: {
        flexDirection: 'row',
        height: 80,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 10,
        backgroundColor: '#D4BAFF',

    },

    btnCategory: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 50,
        borderRadius: 25,
    },

    titleHome: {
        color: '#1e1e1e',
        fontSize: 20,
        fontWeight: 'bold',
    },

    subtitleHome: {
        color: 'white',
        fontSize: 15,
    },

    viewHeader: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: 'white',

    },

    viewChartHeader: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 10,
    },
    chartNoteContainer: {
        flex: 1,
        marginTop: 10,
        paddingHorizontal: 10,
        flexDirection: 'row'
    },

    chartContainer: {
        flex: 3,
        justifyContent: 'space-between'

    },
    chartNoteText: {
        fontSize: 14,
        marginBottom: 5,
    },
    btnCategoryHeader: {
        justifyContent: 'center',
        alignItems: "center",
        width: 50,
        height: 50,
        borderRadius: 25,
    },
})
export default HomeScreen;