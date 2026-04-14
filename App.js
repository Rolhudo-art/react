import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import Welcome from "./pages/welcome";
import Login from "./pages/login";
import Cadastro from "./pages/cadastro";
import Splash from "./pages/splash";
import Cep from "./pages/cep";


const Stack = createNativeStackNavigator();


export default function App() {
  return (

<NavigationContainer>
<Stack.Navigator initialRouteName="Welcome" screenOptions={{headerTransparent:true, headerTitle: '',}} >
  <Stack.Screen name="Welcome" component={Welcome}  />
  <Stack.Screen name="Cadastro" component={Cadastro}  />
  <Stack.Screen name="Login" component={Login}  />
  <Stack.Screen name="Splash" component={Splash} options={{headerTransparent:true, headerTitle:""}} />
  <Stack.Screen name="Cep" component={Cep} options={{headerTransparent:true, headerTitle:""}} />

</Stack.Navigator>
</NavigationContainer>
    
  );
}