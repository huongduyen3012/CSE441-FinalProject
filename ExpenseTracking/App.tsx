import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Transactions from "./src/Transactions";
import Home from "./src/Home";
import Input from "./src/Input";
import AddBudget from "./src/AddBudget";
import Login from "./src/Login";
import { RealmProvider } from "@realm/react";
import IncomeList from "./src/ShowIncome";
import Logout from "./src/Account";
import ExpenseList from "./src/ShowExpense";
import ShowBudget from "./src/AllBudget";
import SignUp from "./src/SignUp";
import { Expense, Income, Budget, User } from "./src/schema";
import EditAccount from "./src/EditUser";

const Stack = createStackNavigator();

const AllSCreen = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />

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

    </Stack.Navigator>
  )
}
const AccountScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Logout" screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Account Information" component={Logout} options={{ headerLeft: () => { return null } }} />
 
        <Stack.Screen name="Edit User" component={EditAccount} />
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