import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Transactions from "./code/Transactions";
import Home from "./code/Home";
import Input from "./code/Input";
import AddBudget from "./code/AddBudget";
import Login from "./code/Login";
import { RealmProvider } from "@realm/react";
import IncomeList from "./code/ShowIncome";
import Logout from "./code/Account";
import ExpenseList from "./code/ShowExpense";
import ShowBudget from "./code/AllBudget";
import { Expense } from "./code/schema";
import { Income } from "./code/schema";
import { Budget } from "./code/schema";
import { User } from "./code/schema";
import SignUp from "./code/SignUp";
const Stack = createStackNavigator();

const AllSCreen = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerLeft: () => { return null } }} />

      <Stack.Screen name="TabNavigator" component={TabNavigator} />

    </Stack.Navigator>
  )
}

const HomeScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: true, headerStyle: { backgroundColor: '#2196F3' }, headerTintColor: 'white' }}>

      <Stack.Screen name="Home" component={Home} options={{ headerLeft: () => { return null } }} />

      <Stack.Screen name="Budget" component={AddBudget} options={{ title: 'Budget' }} />

      <Stack.Screen name="BudgetList" component={ShowBudget} options={{ title: 'Budget List' }} />


      <Stack.Screen name="Transaction" component={Transactions} options={{ title: 'Transaction history' }} />
    </Stack.Navigator>
  )
}

const InputScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Input" screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Input" component={Input} />

      <Stack.Screen name="Income List" component={IncomeList} options={{ headerShown: true }} />

      <Stack.Screen name="Expense List" component={ExpenseList} options={{ headerShown: true }} />

    </Stack.Navigator>
  )
}
const AccountScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Logout" screenOptions={{ headerShown: true }}>
      <Stack.Screen name="User Account Information" component={Logout} options={{ headerLeft: () => { return null } }} />
    </Stack.Navigator>
  )
}
const Tab = createMaterialBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home" labeled={false} inactiveColor={"greyDark"} >
      <Tab.Screen name="HomeScreen" component={HomeScreen}
        options={{ tabBarIcon: 'home' }} />
      <Tab.Screen name="InputScreen" component={InputScreen} options={{ tabBarIcon: 'pencil' }} />
      <Tab.Screen name="LogoutScreen" component={AccountScreen} options={{ tabBarIcon: 'account' }} />
    </Tab.Navigator>
  )
}

const App = () => {
  return (
    <RealmProvider schema={[User, Expense, Income, Budget]}>
        <NavigationContainer>
          <AllSCreen />
        </NavigationContainer>
    </RealmProvider>
  )
}

export default App;