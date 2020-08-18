import React from "react";
import { Text, View } from "react-native";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";

export default (props, navigation) => {
  let [fontsLoaded] = useFonts({
    inkfree: require("../../../assets/fonts/Inkfree/Inkfree.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontFamily: "inkfree", fontSize: 40 }}>Inter Black</Text>
      </SafeAreaView>
    );
  }
};
