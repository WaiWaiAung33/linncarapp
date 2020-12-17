import React from "react";
import { StyleSheet, Modal, View, Image } from "react-native";
export default class LoadingModal extends React.Component {
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isOpenModal}
      >
        <View style={styles.loadingContainer}>
          <Image
            source={require("@images/126.gif")}
            style={styles.loadingImage}
          />
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.4)",
    justifyContent: "center",
    alignItems: "center"
  },
  loadingImage: {
    width: 70,
    height: 70
  }
});
