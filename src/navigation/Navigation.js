import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View} from 'react-native';
import { Icon } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HomeScreen from '../screens/HomeScreen';
import AddContact from '../screens/AddContact';
import UpdateContact from '../screens/UpdateContact';


const Stack = createStackNavigator();

export default function Navigation() {

    const searchButton = () => {
        return (
            <View style={styles.containerButton}>
                <TouchableOpacity>
                    <Icon name='search' style={styles.icon} />
                </TouchableOpacity>
            </View>
        );
    }
    
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'App contactos', headerStyle: { backgroundColor: '#4b0082' }, headerTintColor: '#fff', headerRight: () => searchButton() }} />
            <Stack.Screen name="Contact" component={ AddContact } options={{ title: 'Agregar contacto', headerStyle: { backgroundColor: '#4b0082' }, headerTintColor: '#fff'}} />
            <Stack.Screen name="Update" component={ UpdateContact } options={{ title: 'Actualizar contacto', headerStyle: { backgroundColor: '#4b0082' }, headerTintColor: '#fff'}} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    containerButton: {
        flexDirection: 'row',
        padding: 2,
        margin: 5
    },
    icon: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
})