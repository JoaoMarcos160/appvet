import React from "react";
import { StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import colors from "../../styles/colors";

export default function Loading() {
  return (
    <SafeAreaView style={styles.teste}>
      <ActivityIndicator
        style={styles.loading}
        size="large"
        color={colors.letraNormalClaro}
        animating={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loading: {
    margin: "auto",
    alignSelf: "center",
    alignContent: "center",
  },
  teste: {
    position: "relative",
    flex: 1,
    maxHeight: 50,
    maxWidth: "100%",
    margin: 30,
  },
});
