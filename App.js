// import { StatusBar } from "expo-status-bar";
import React from "react";
import Login from "./src/pages/Login";
import Home from "./src/pages/Home";
import Teste from "./src/pages/Teste";
import Doencas from "./src/pages/Doencas";
import CriarConta from "./src/pages/CriarConta";
import CriarCliente from "./src/pages/CriarCliente";
import CriarAnimal from "./src/pages/CriarAnimal";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHouseUser,
  faUser,
  faFileMedicalAlt,
  faUsers,
  faIdCard,
  faUserCircle,
  faDog,
} from "@fortawesome/free-solid-svg-icons";
import colors, { sizes } from "./src/styles/colors";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Drawer.Navigator
        initialRouteName="Login"
        // overlayColor={colors.drawerColor}
        drawerContentOptions={{
          labelStyle: {
            margin: -5,
            color: colors.letraNormalClaro,
            fontSize: sizes.letraPequena,
            borderBottomColor: colors.letraNormalClaro,
            borderBottomWidth: 1,
          },
        }}
        drawerStyle={{
          backgroundColor: colors.drawerColor,
          borderBottomEndRadius: 20,
          borderTopEndRadius: 20,
          marginTop: "7%",
        }}
      >
        <Drawer.Screen
          name="Login"
          component={Login}
          options={{
            swipeEnabled: false,
            gestureEnabled: false,
            drawerIcon: () => (
              <FontAwesomeIcon
                icon={faUser}
                color={colors.letraNormalClaro}
                size={sizes.iconDrawer}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            drawerIcon: () => (
              <FontAwesomeIcon
                icon={faHouseUser}
                color={colors.letraNormalClaro}
                size={sizes.iconDrawer}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Doenças"
          component={Doencas}
          options={{
            drawerIcon: () => (
              <FontAwesomeIcon
                icon={faFileMedicalAlt}
                color={colors.letraNormalClaro}
                size={sizes.iconDrawer}
              />
            ),
          }}
        />
        {/* <Drawer.Screen name="Criações" component={Criacao} /> */}
        <Drawer.Screen
          name="Criar Cliente"
          component={CriarCliente}
          options={{
            drawerIcon: () => (
              <FontAwesomeIcon
                icon={faIdCard}
                color={colors.letraNormalClaro}
                size={sizes.iconDrawer}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Criar Animal"
          component={CriarAnimal}
          options={{
            drawerIcon: () => (
              <FontAwesomeIcon
                icon={faDog}
                color={colors.letraNormalClaro}
                size={sizes.iconDrawer}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Criar Conta"
          component={CriarConta}
          options={{
            swipeEnabled: false,
            gestureEnabled: false,
            drawerIcon: () => (
              <FontAwesomeIcon
                icon={faUserCircle}
                color={colors.letraNormalClaro}
                size={sizes.iconDrawer}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Sobre nós"
          component={Criacao}
          options={{
            drawerIcon: () => (
              <FontAwesomeIcon
                icon={faUsers}
                color={colors.letraNormalClaro}
                size={sizes.iconDrawer}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export function Criacao() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Criar Conta" component={CriarConta} />
      <Tab.Screen name="Criar Cliente" component={CriarCliente} />
    </Tab.Navigator>
  );
}
