import React, { useState } from 'react';
import { Content, Form, Item, Input, Label, Text, Button, Icon } from 'native-base';
import { StyleSheet, ToastAndroid } from 'react-native';
import Reload from '../hooks/Reload';
import firebase from '../config/firebase'
import 'firebase/firestore';

export default function AddContact(props) {
    const db = firebase.firestore(firebase)
    const {changeReload} = Reload();
    const { navigation } = props;
    const [formData, setFormData] = useState({})
    const [formError, setFormError] = useState({});

    const sendData = async () => {
        let errors = {}
        if (!formData.name || !formData.email) {
            if (!formData.name) errors.name = true;
            if (!formData.email) errors.email = true;
        } else {
           await db.collection("contacts").add(formData).then(resp => {
                ToastAndroid.show('Contacto agregado correctamente', ToastAndroid.SHORT);
                changeReload(true)
                navigation.navigate("Home")
            }).catch((error) => {
                ToastAndroid.show('Ha ocurrido un error', ToastAndroid.SHORT);
            })
        }
        setFormError(errors)
    }
  
    return (
        <Content>
            <Form>
                {
                    formError.name ?
                        <Item inlineLabel error>
                            <Label>Nombre</Label>
                            <Input onChange={(e) => setFormData({ ...formData, name: e.nativeEvent.text })} />
                            <Icon name='close-circle' />
                        </Item>
                        :
                        <Item inlineLabel>
                            <Label>Nombre</Label>
                            <Input onChange={(e) => setFormData({ ...formData, name: e.nativeEvent.text })} />
                        </Item>
                }


                {
                    formError.email ?
                        <Item inlineLabel error>
                            <Label>Email</Label>
                            <Input onChange={(e) => setFormData({ ...formData, email: e.nativeEvent.text })} />
                            <Icon name='close-circle' />
                        </Item>
                        :
                        <Item inlineLabel>
                            <Label>Email</Label>
                            <Input onChange={(e) => setFormData({ ...formData, email: e.nativeEvent.text })} />
                        </Item>
                }

                <Button block style={styles.button} onPress={sendData}>
                    <Text>Agregar contacto</Text>
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