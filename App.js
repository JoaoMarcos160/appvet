// import { StatusBar } from "expo-status-bar";
import React from "react";
import Login from "./src/pages/Login";
import Home from "./src/pages/Home";
import Teste from "./src/pages/Teste";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouseUser, faAd, faIcons } from "@fortawesome/free-solid-svg-icons";
import colors, { sizes } from "./src/styles/colors";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Login"
        // overlayColor={colors.drawerColor}
        drawerContentOptions={{ labelStyle: { color: colors.botoes } }}
        drawerStyle={{
          backgroundColor: colors.drawerColor,
        }}
      >
        <Drawer.Screen
          name="Login"
          component={Login}
          options={{
            swipeEnabled: false,
            gestureEnabled: false,
          }}
        />
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Sobre nós" component={Teste} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
