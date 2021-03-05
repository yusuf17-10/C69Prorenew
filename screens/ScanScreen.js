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
                
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style = {styles.absoluteFillObject}
                
                />

            );
        }

        else if(this.state.buttonState === "normal"){
                return(
                    <View style = {styles.container}>
                        <Text style={styles.displayText}>{
                             hasCameraPermissions === true ? this.state.scannedData:"RequestCameraPermission"

                        }</Text>

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
                            
                    </View>
                )
        }
    }
}


const styles = StyleSheet.create({
    absoluteFillObject: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',

        justifyContent: 'center',
      },
      displayText:{
          flex:1,
          alignItems:'center',
          justifyContent:'center',
          marginTop:70,
          fontSize:20
      },
      scanButton:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:400


    }
  });
  

    
  

  