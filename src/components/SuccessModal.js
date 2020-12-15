import React from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";

export default class CustomModal extends React.Component {
  close() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isOpen}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBody}>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  alignItems: "center",
                  flex: 1,
                  marginTop: 20,
                }}
              >
                <Image
                  source={
                    this.props.headerIcon
                      ? this.props.headerIcon
                      : require("@images/success.png")
                  }
                  style={styles.modalimg}
                />
              </View>

              <TouchableOpacity
                onPress={() => this.close()}
                style={styles.closeBtn}
                activeOpacity={0.7}
              >
                <Image
                  source={require("@images/cross.png")}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.messageWrapper}>
              <Text style={styles.showText}>{this.props.text}</Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "rgba(52, 52, 52, 0.4)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalBody: {
    backgroundColor: "#fff",
    width: 300,
    height: null,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  modalimg: {
    width: 55,
    height: 55,
    marginTop: 15,
  },
  showText: {
    textAlign: "center",
    fontSize: 14,
  },
  messageWrapper: {
    padding: 10,
    justifyContent: "center",
    minHeight: 70,
  },
  closeBtn: {
    padding: 10,
    position: "absolute",
    right: 5,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
});
