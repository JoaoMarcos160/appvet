// import { StatusBar } from "expo-status-bar";
import React from "react";
import Login from "./src/pages/Login";
import Home from "./src/pages/Home";
import Teste from "./src/pages/Teste";
import Doencas from "./src/pages/Doencas";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHouseUser,
  faAd,
  faIcons,
  faUser,
  faFileMedical,
  faBriefcaseMedical,
  faFileMedicalAlt,
  faPeopleArrows,
  faPeopleCarry,
  faPeace,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import colors, { sizes } from "./src/styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
        <Drawer.Screen
          name="Sobre nós"
          component={Teste}
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
