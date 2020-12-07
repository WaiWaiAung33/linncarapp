import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Home extends React.Component {
    render(){
        return (
            <View style={styles.container}>
              <StatusBar style="auto" />
            <View style={styles.secondContainer}>
            <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:150,margin:10}}>
            <View style={styles.card}/>
            <View style={styles.card}/>
            </View>
            </View>
            
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  secondContainer:{
    height:200,
    backgroundColor:"#3D73D5"
  },
  card:{
    width:"48%",
    height:130,
    backgroundColor:"white",
    borderWidth:1,
    borderColor:"#707070",
    borderRadius:10
  }
});
