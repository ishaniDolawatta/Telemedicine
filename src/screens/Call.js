import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Category from '../components/Category/Category';
import { Auth } from 'aws-amplify';
import { listSongs } from '../graphql/queries';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

export default function Call({ navigation }) {
    const [username, setUsername] = useState('');

    useEffect(() => {
        checkUser();
    }, []);

    function checkUser() {
        Auth.currentAuthenticatedUser()
            .then((user) => setUsername(user.username))
            .catch((err) => console.log(err));
    }

    const call =  (callNumber) => {
        console.log('Imediat call - ', callNumber);
        RNImmediatePhoneCall.immediatePhoneCall(callNumber);
    };

    return (
        <View style={styles.container}>
            <View style={styles.categoryContainer}>
                <Category title={'Cardiologists'} icon={'cardio'} style={{ width: '50%' }} onPress={() => call('00442921680703')} />
                <Category title={'Dermatologists'} icon={'dermato'} style={{ width: '50%' }} />
                <Category title={'Emergency Medicine Specialists'} icon={'emergency'} style={{ width: '50%' }} />
                <Category title={'Nephrologists'} icon={'nephro'} style={{ width: '50%' }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20
    },

    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
    },
});
