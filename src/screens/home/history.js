import React from "react";
import {View,Text,StyleSheet,FlatList} from "react-native";

import DatePicker from "react-native-datepicker";
import Moment from "moment";

//import styles
import Style from "@styles/Styles";

//import components
import HistoryCard from "@components/historyCard";

export default class History extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={{flexDirection:"row",marginTop:10,marginLeft:10,marginRight:10}}>
                    <Text style={{flex:1}}>Start Date</Text>
                    <Text style={{flex:1,paddingLeft:15}}>End Date</Text>
                </View>
                <View style={styles.secondContainer}>
         
                <DatePicker
                // date={this.state.changestartDate}
                mode="date"
                format="DD-MM-YYYY"
                // maxDate={Moment().endOf("day").toDate()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconSource={require("@images/calendar.png")}
                style={Style.datePickerContainer}
                customStyles={{
                    dateIcon: Style.datePickerDateIcon,
                    dateInput: Style.datePickerDateInput,
                    dateText: Style.datePickerDateText,
                }}
                // onDateChange={(date) => this._hadleChangeDate(date)}
                />
                <DatePicker
                // date={this.state.changeendDate}
                mode="date"
                format="DD-MM-YYYY"
                maxDate={Moment().endOf("day").toDate()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                iconSource={require("@images/calendar.png")}
                style={Style.datePickerContainer}
                customStyles={{
                    dateIcon: Style.datePickerDateIcon,
                    dateInput: Style.datePickerDateInput,
                    dateText: Style.datePickerDateText,
                }}
                // onDateChange={(date) => this._handleChangeEndDate(date)}
                />
            </View>
            <HistoryCard
             OnPress={()=>this.props.navigation.navigate("HistoryDetail")}
            />
            <HistoryCard/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    secondContainer: {
        marginTop: 10,
        justifyContent: "space-between",
        flexDirection: "row",
        margin: 10,
      },
})