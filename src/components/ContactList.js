import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { List, ListItem, Text, Left, Right, Thumbnail, Body } from 'native-base';

export default function ContactList(props){
   const {contact, navigation, deleteContact} = props;

    return(
        <List>
            <TouchableOpacity onPress={(e) => navigation.navigate("Update", {contact: contact})} onLongPress={() => deleteContact(contact)}>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{ uri: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png' }} />
                    </Left>
                    <Body>
                        <Text>{contact.name}</Text>
                        <Text note>{contact.email}</Text>
                    </Body>
                    <Right>
                        <Text note>3:43 pm</Text>
                    </Right>
                </ListItem>
            </TouchableOpacity>
        </List>
    );
}