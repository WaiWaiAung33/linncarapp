import {StyleSheet} from "react-native";

const Styles = StyleSheet.create({
         //Date Picker
  datePickerContainer: {
    borderStyle: "solid",
    borderWidth: 1,
    // alignItems:"center",
    justifyContent:"space-between",
    // width:"50%",
    height:40,
    borderRadius: 5,
    borderColor:"#308DCC",
    backgroundColor:"#ffffff",
    width:"48%"
  },
  datePickerDateIcon: {
    height: 20,
    width: 20
  },
  datePickerDateInput: {
    borderWidth: 0,
    // justifyContent: "center",
  },
  datePickerDateText: {
    textAlign:"left",
    fontSize: 14,
    // backgroundColor:"red",
    // position:"absolute"
  },
  datePickerContainerOne: {
    borderStyle: "solid",
    borderWidth: 1,
    // alignItems:"center",
    // justifyContent:"space-between",
    width:"100%",
    height:35,
    borderRadius: 5,
    borderColor:"#ffffff",
    backgroundColor:"red",
  },
});
export default Styles;