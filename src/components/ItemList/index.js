import React, { Component, PureComponent } from "react";
import { Text, StyleSheet, View } from "react-native";
import colors from "../../styles/colors";

export default class ItemList extends PureComponent {
  render() {
    return <Text style={styles.itemLista}> {this.props.children} </Text>;
  }
}

const styles = StyleSheet.create({
  itemLista: {
    textAlign: "center",
    padding: 1,
    margin: 2,
    paddingBottom: 5,
    fontSize: 18,
    borderBottomColor: colors.letraNormalClaro,
    borderBottomWidth: 1,
    color: colors.letraNormalClaro,
  },
});
