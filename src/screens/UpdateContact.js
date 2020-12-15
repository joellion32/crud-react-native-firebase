import React, { useState } from 'react';
import { Content, Form, Item, Input, Label, Text, Button } from 'native-base';
import { StyleSheet, ToastAndroid } from 'react-native';
import Reload from '../hooks/Reload';
import firebase from '../config/firebase'
import 'firebase/firestore';

export default function UpdateContact(props) {
    const db = firebase.firestore(firebase)
    const {changeReload} = Reload();
    const { route, navigation } = props;
    const {contact} = route.params

    const inititalState = {
        name: contact.name,
        email: contact.email
    }

    const [formData, setFormData] = useState(inititalState)
  
    const handleTextChange = (value, prop) => {
        console.log(value)
        setFormData({ ...formData, [prop]: value });
    }

    const updateContact = () => {
        db.collection("contacts").doc(contact.id).set({
            name: formData.name,
            email: formData.email
        }).then(resp => {
            ToastAndroid.show('Contacto actualizado correctamente', ToastAndroid.SHORT);
            changeReload(true)
            navigation.navigate("Home")
        }).catch(error => {
            ToastAndroid.show('Ha ocurrido un error', ToastAndroid.SHORT);
        })
    }


    return (
        <Content>
            <Form>
             <Item inlineLabel>
                    <Label>Nombre</Label>
                    <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.nativeEvent.text })} 
                    />
                </Item>

                <Item inlineLabel>
                    <Label>Email</Label>
                    <Input
                        value={formData.email}
                        onChangeText={(value) => handleTextChange(value, "email")} />
                </Item>

                <Button block style={styles.button} onPress={updateContact}>
                    <Text>Actualizar contacto</Text>
                </Button>
            </Form>
        </Content>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#4b0082",
        marginHorizontal: 5,
        marginTop: 8
    },
    inputError: {
        borderColor: '#940c0c'
    }
})