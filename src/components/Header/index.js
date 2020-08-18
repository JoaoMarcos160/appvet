import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { sizes } from "../../styles/colors";
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
      </View>
    );
  }
};

const styles = StyleSheet.create({
  text: {
    fontSize: sizes.letraNormal,
    textAlign: "center",
    fontFamily: "inkfree",
  },
});
