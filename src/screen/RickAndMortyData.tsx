import React, { Component, useState } from 'react'
import { View, Text, ImageBackground, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { Card } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default ({ route, navigation }) => {
    return (
        <View style={styles.view1}>
            <View style={{
                flex: 1,
                marginTop: 10
            }}>
                <Card containerStyle={{ backgroundColor: '#c6f2a4', borderRadius: 10 }}>
                    <Image source={{ uri: route.params.image }}
                        style={styles.image} />
                </Card>
            </View>
            <View style={{
                marginTop: 70,
                flex: 3,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row'
            }}>
                <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 20 }}>
                    Name: {route.params.name}{'\n'}
                    Status: {route.params.status}{'\n'}
                    Species: {route.params.species} {'\n'}
                    Type: {route.params.type}{'\n'}
                    Gender: {route.params.gender}{'\n'}
                    Origin Name: {route.params.origin.name}{'\n'}
                </Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    view1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'

    },
    image: {
        width: 250,
        height: 250,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderRadius: 10
    }
})