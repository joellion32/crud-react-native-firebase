import React, { useEffect, useState } from 'react';
import { Fab, Container, Icon, View, Spinner } from 'native-base';
import ContactList from '../components/ContactList';
import { ScrollView } from 'react-native-gesture-handler';
import { Alert } from "react-native";
import Reload from '../hooks/Reload';
import firebase from '../config/firebase'
import 'firebase/firestore';

export default function HomeScreen(props) {
    const db = firebase.firestore(firebase)
    const {reload, changeReload} = Reload();
    const {navigation} = props;
    const [contacts, setContacts] = useState([])

    console.log(reload)
    useEffect(() => {
        setContacts([])
        db.collection("contacts").get()
            .then((resp) => {
                const contacts = []
                resp.forEach((doc) => {
                    const data = doc.data()
                    data.id = doc.id;
                    contacts.push(data)
                });
                setContacts(contacts)
                changeReload(false)
            })
    }, [reload]) 


    const deleteContact = (contact) => {
        Alert.alert(
            "Alerta",
            `Estas seguro que quieres eliminar a ${contact.name}`,
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => {
                  db.collection("contacts").doc(contact.id).delete()
                  changeReload(true)
              }}
            ],
            { cancelable: false }
          );
       }

    return (
            <Container>
            <ScrollView>
                {
                    contacts.length == 0 ? 
                    <Spinner color='blue' />
                    :
                    contacts.map((item, index) => (
                        <ContactList  deleteContact={deleteContact} navigation={navigation} key={item.id} contact={item} />
                    ))
                }
            </ScrollView>
               

                <View style={{ flex: 1 }}>
                    <Fab
                        direction="up"
                        containerStyle={{}}
                        style={{ backgroundColor: '#4b0082' }}
                        position="bottomRight"
                        onPress={() => navigation.navigate("Contact")}>
                        <Icon name="add" />
                    </Fab>
                </View>
            </Container>
    )
}