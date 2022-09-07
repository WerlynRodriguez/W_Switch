import * as ScreenOrientation from 'expo-screen-orientation'
import * as NavigationBar from 'expo-navigation-bar';//Only Android
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import Home from './MenuUI/Home';
import Credits from './MenuUI/Credits';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect (() => {
    changeScreenOrientation();
    hideNavigationBar();
  }, [])

  // Locks the screen orientation to portrait
  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }

  //Hide the navigation bar
  async function hideNavigationBar() {
    NavigationBar.setVisibilityAsync("hidden");
  }

  //Principal tree Navigator
  return (
    <NavigationContainer>
      <StatusBar style="auto" hidden/>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="Credits" component={Credits} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*<GameEngine style={{position: 'absolute',top: 0,left: 0,right: 0,bottom: 0,backgroundColor:"white"}}>

</GameEngine> */

//<StatusBar style="auto" hidden/>

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
