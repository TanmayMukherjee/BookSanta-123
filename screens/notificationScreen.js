import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import firebase from 'firebase';
import MyHeader from '../components/myHeader';
import db from '../config';
import SwipeableFlatList from '../components/swipeableFlatlist'

export default class NotificationScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: firebase.auth().currentUser.email,
            allNotifications: []
        };

        this.notificationRef = null
    }

    getNotifications = () => {
        console.log("getNotifiaction")
        this.requestRef = db.collection("all_notifications")
            .where("notificationStatus", "==", "unread")
            .where("targetedUserId", '==', this.state.userId)
            .onSnapshot((snapshot) => {
                var allNotifications = []
                snapshot.docs.map((doc) => {
                    var notification = doc.data()
                    console.log(notification);
                    notification["doc_id"] = doc.id
                    allNotifications.push(notification)
                });
                this.setState({
                    allNotifications: allNotifications
                });
            })
            console.log(this.state);
    }

    componentDidMount() {
        console.log("Notifiaction");
        this.getNotifications()
    }

 
    componentWillUnmount() {
        this.notificationRef
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, index }) => {
        return (
            <ListItem
                key={index}
                leftElement={<Icon name="book" type="font-awesome" color='#696969' />}
                title={item.bookName}
                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                subtitle={item.message}
                bottomDivider
            />
        )
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 0.1 }}>
                    <MyHeader title={"Notifications"} navigation={this.props.navigation} />
                </View>
                <View style={{ flex: 0.9 }}>
                    {
                        this.state.allNotifications.length === 0
                            ? (
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 25 }}>You have no notifications</Text>
                                </View>
                            )
                            : (
                                <SwipeableFlatList allNotifications={this.state.allNotifications} />
                            )
                    }
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})