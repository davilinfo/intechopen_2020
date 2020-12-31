import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import api from '../services/api';

export default function PaymentForm({route, navigation}) {
  
  const [value, onChangeText] = React.useState('');

  function _handlePressButtonAsync(){
    await api.post('/userRequest', {
      phone: route.params('phone'), 
      deliveryaddress: route.params('deliveryaddress'), 
      request_type: route.params('food')});
  }
  
  return (
    <View>      
      <Text>{this.state.result && JSON.stringify(this.state.result)}</Text>
      <Text>Please inform your passphrase</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => onChangeText(text)}
        value={value}
      />
      <Button title="Proceed with the payment clicking here" onPress={_handlePressButtonAsync} />
    </View>
  );  

}