import React, { useState } from 'react';
import { PanResponder, View, Alert } from 'react-native';
import { NavigationContainer, createNavigationContainerRef, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dummy from './screens/Dummy';
import Lockscreen from './screens/Lockscreen';
import Home from './screens/Home';

export default function App() {

  const [show, setShow] = useState(false);
  let _panResponder = {};
  let timer = 0;
  const timeNoAction = 15000;

  componentWillMount = () => {
    _panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => {
        resetTimer()
        return true
      },
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => { resetTimer(); return false },
      onMoveShouldSetPanResponderCapture: () => false,
      onPanResponderTerminationRequest: () => true,
      onShouldBlockNativeResponder: () => false,
    });
    timer = setTimeout(() => setShow(true), timeNoAction)
  };

  resetTimer = () => {
    clearTimeout(timer)
    if (show)
      setShow(false)
    timer = setTimeout(() => setShow(false), timeNoAction)
  }
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator {..._panResponder.panHandlers}>
        
      {
                show ? Alert.alert(
                    'Alert',
                    'You have been inactive for 15sec',
                    [
                        { text: 'OK', onPress: () => this.resetTimer() },
                    ],
                    { cancelable: false }
                ) : null
            }
        <Stack.Screen
          name="Lockscreen"
          component={Lockscreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Dummy" component={Dummy} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
