import React, { Component } from 'react';
import { Header, Icon, Badge } from 'react-native-elements';
import { View, Text, StyeSheet, Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config';


export default class MyHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ""
        }
    }

    getNumberOfUnreadNotifications() {
        db.collection('all_notifications').where('notificationStatus', '==', "unread")
            .onSnapshot((snapshot) => {
                var unreadNotifications = snapshot.docs.map((doc) => doc.data())
                this.setState({
                    value: unreadNotifications.length
                })
            })
    }

    componentDidMount() {
        this.getNumberOfUnreadNotifications()
    }

    BellIconWithBadge = (props) => {
        return (
            <View>
                <Icon name='bell' type='font-awesome' color='#696969' onPress={() => this.props.navigation.navigate('Notifications')} />
                <Badge value="1" containerStyle={{ position: 'absolute', top: -4, right: -4 }} />
            </View>
        )
    }
    render() {
        return (
            <Header
            leftComponent={<Icon name='bars' type='font-awesome' color='#696969' onPress={() => this.props.navigation.toggleDrawer()} />}
            centerComponent={{ text: this.props.title, style: { color: '#FC766A', fontSize: 20, fontWeight: "bold", } }}
            rightComponent={<this.BellIconWithBadge{...this.props} />}
            backgroundColor="#01EFA1"
        />
            
        )
    }
}

