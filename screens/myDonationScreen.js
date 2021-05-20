import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView, FlatList, StyleSheet } from 'react-native';
import { Card, Icon, ListItem } from 'react-native-elements'
import MyHeader from '../components/myHeader.js'
import firebase from 'firebase';
import db from '../config.js'

export default class MyDonationScreen extends Component {
    static navigationOptions = { header: null };

    constructor() {
        super()
        this.state = {
            userId: firebase.auth().currentUser.email,
            allDonations: [],
            donerName: ''
        }
        this.requestRef = null
    }

    getDonorDetails = (userId) => {
        db.collection("users").where("emailId", "==", userId).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    this.setState({
                        "donorName": doc.data().firstName + " " + doc.data().lastName
                    })
                });
            })
    }
    sendBook = (bookDetails) => {
        if (bookDetails.requestStatus === "Book Sent") {
            var requestStatus = "Donor Interested";
            console.log("MydonationScreen:", bookDetails)
            db.collection("allDonations").doc(bookDetails.doc_id).update({
                'requestStatus': "Donor Interested"
            })
            this.sendNotification(bookDetails, requestStatus)
            console.log('Here')
        }
        else {
            var requestStatus = "Book Sent";
            console.log("Book Send: ", bookDetails.doc_id)
            db.collection("allDonations").doc(bookDetails.doc_id).update({
                'requestStatus': "Book Sent"
            })
            this.sendNotification(bookDetails, requestStatus)
            console.log('Here Book Send')
        }
    }

    getAllDonations = () => {
        this.requestRef = db.collection("allDonations").where("donorId", '==', this.state.userId)
            .onSnapshot((snapshot) => {
                //var allDonations = snapshot.docs.map(document => document.data());
                var allDonations = [];
                snapshot.docs.map((doc) => {
                    var donation = doc.data();
                    donation['doc_id'] = doc.id;
                    allDonations.push(donation);
                });
                this.setState({
                    allDonations: allDonations,
                });
            })
    }


    sendNotification = (bookDetails, requestStatus) => {
        var requestID = bookDetails.requestId;
        var donorID = bookDetails.donorId;

        db.collection("all_notifications")
            .where("requestId", "==", requestID)
            .where("donorId", "==", donorID)
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    var message = ""
                    if (requestStatus === "Book Sent") {
                        message = this.state.donorName + " sent you book"
                    } else {
                        message = this.state.donorName + " has shown interest in donating the book"
                    }
                    db.collection("AllNotifications").doc(doc.id).update({
                        "message": message,
                        "notification_status": "unread",
                        "date": firebase.firestore.FieldValue.serverTimestamp()
                    })
                });
            })
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, i }) => (
        <ListItem
            key={i}
            title={item.bookName}
            subtitle={"Requested By: " + item.requestedBy + "\nStatus : " + item.requestStatus}
            leftElement={<Icon name="book" type="font-awesome" color='#696969' />}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            rightElement={
                <TouchableOpacity
                    style={[
                        styles.button,
                        {
                            backgroundColor: item.requestStatus === "Book Sent" ? "green" : "#ff5722"
                        }
                    ]}
                    onPress={() => {
                        this.sendBook(item)
                    }}
                >
                    <Text style={{ color: '#ffff' }}>
                        {
                            item.requestStatus === "Book Sent" ? "Book Sent" : "Send Book"
                        }
                    </Text>
                </TouchableOpacity>
            }
            bottomDivider
        />
    )


    componentDidMount() {
        this.getAllDonations()
        this.getDonorDetails(this.state.userId)
    }

    componentWillUnmount() {
        this.requestRef;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <MyHeader navigation={this.props.navigation} title="My Donations" />
                <View style={{ flex: 1 }}>
                    {
                        this.state.allDonations.length === 0
                            ? (
                                <View style={styles.subtitle}>
                                    <Text style={{ fontSize: 20 }}>List of all book Donations</Text>
                                </View>
                            )
                            : (
                                <FlatList
                                    keyExtractor={this.keyExtractor}
                                    data={this.state.allDonations}
                                    renderItem={this.renderItem}
                                />
                            )
                    }
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ff5722",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8
        },
        elevation: 16
    },
    subtitle: {
        flex: 1,
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})