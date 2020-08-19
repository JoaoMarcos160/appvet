import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors, { sizes } from "../../styles/colors";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";

export default (props) => {
  let [fontsLoaded] = useFonts({
    inkfree: require("../../../assets/fonts/Inkfree/Inkfree.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <Text style={styles.text}>AppVet</Text>
        {props.title && <Text style={styles.title}>{props.title}</Text>}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  text: {
    fontSize: sizes.letraGrande,
    textAlign: "left",
    fontFamily: "inkfree",
    color: colors.letraNormalClaro,
    marginLeft: 15,
  },
  title: {
    fontSize: sizes.letraNormal,
    textAlign: "center",
    fontFamily: "inkfree",
    color: colors.letraNormalClaro,
  },
});
