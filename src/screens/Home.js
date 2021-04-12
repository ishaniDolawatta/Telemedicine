import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Auth } from 'aws-amplify';
import MenuItem from '../components/MenuItem/MenuItem';

export default function Home({ navigation, updateAuthState }) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    checkUser();
  }, []);

  function checkUser() {
    Auth.currentAuthenticatedUser()
      .then((user) => setUsername(user.attributes.email))
      .catch((err) => console.log(err));
  }

  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState('loggedOut');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text> {username} </Text>
      <Button title="Sign Out" color="tomato" onPress={signOut} />
      <View style={styles.menuItemContainer}>
        <MenuItem title={'Calls'} icon={'call'} style={{ width: '50%' }} onPress={() => navigation.navigate('Call')} />
        <MenuItem title={'Reports'} icon={'report'} style={{ width: '50%' }} onPress={() => navigation.navigate('Report')} />
        <MenuItem title={'User'} icon={'user'} style={{ width: '50%' }} />
        {/* <MenuItem title={'Contacts'} icon={'contact'} style={{ width: '50%' }} /> */}
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

  menuItemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
});
