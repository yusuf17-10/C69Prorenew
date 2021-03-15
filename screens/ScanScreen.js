import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native';
import * as Permissions from "expo-permissions";
import {BarCodeScanner} from "expo-barcode-scanner";

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal'
        }
    }
    getCameraPermissions=async()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);

        this.setState({
            hasCameraPermissions:status === "granted",buttonState:"clicked",
            scan:false
        });
    }
    handleBarCodeScanner=async({type,data})=>{
        this.setState({scanned:true,
        scannedData:data,
        buttonState:'normal'  
  
      });
    }

    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const scannedData= this.state.scannedData;

        if(this.state.buttonState === "clicked" && hasCameraPermissions){
            return(
                <BarCodeScanner
                
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanner}
                    style = {StyleSheet.absoluteFillObject}
                
                />

            );
        }

        else if(this.state.buttonState === "normal"){
                return(
                    <View style = {styles.container}>
                        

                        <TouchableOpacity
                        
                        onPress = {this.getCameraPermissions}
                            style={styles.scanButton}
                            title = "Bar Code Scanner"
                           >
                                <Image 
                                source={require("../assets/scan.png")}
                                style = {{width:200,height:200}}
                                />
                               
                                <Text style = {{fontSize:20,marginTop:30}}>Scan Qr Code</Text>
                        </TouchableOpacity>
                        <Text style={styles.displayText}>
                            {"scannedData :  " +this.state.scannedData}
                        </Text>
                    </View>
                )
        }
    }
}


const styles = StyleSheet.create({
    
    container: {
        
        alignItems: 'center'

      },
      displayText:{
          alignItems:'center',
          justifyContent:'center',
          marginTop:70,
          fontSize:20
      },
      scanButton:{
        
        alignItems:'center',
        justifyContent:'center',
        marginBottom:30
    }
  });
  

    
  

  