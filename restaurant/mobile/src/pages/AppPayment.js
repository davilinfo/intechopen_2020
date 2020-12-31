import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';

export default function AppPayment({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);  
  const [foodscanned, setFood] = useState('');  

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);    

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
        
    setFood(encodeURI(data.split("?")[1]));
    
    alert(`Data ${data} has been scanned!`);
  };  

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}      
      </View>

      {scanned && foodscanned !== null && foodscanned !== undefined && <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Proceed with the payment</Text>
      <Button
        title="Store"
        onPress={() => WebBrowser.openBrowserAsync(`http://www.liskrestaurant.com:5000/FoodOrderPayment?${foodscanned}`)}
      />
      </View>
      }
    </>
  );
}