import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../lib/constants';

const Profile = ({route}: any) => {
  const {tailor} = route.params;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.roundedImage}>
        <Image
          source={{uri: tailor?.photoURL || 'https://via.placeholder.com/150'}}
          style={styles.image}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.nameText}>{tailor?.name}</Text>
        <Text style={styles.nameText}>{tailor?.email}</Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: Colors.Secondary,
  },
  nameText: {
    color: Colors.Primary,
    fontSize: 20,
  },
  roundedImage: {
    height: 200,
    width: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  card: {
    backgroundColor: Colors.White,
    padding: 20,
    margin: 20,
    borderRadius: 10,
    shadowColor: Colors.Black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  countCard: {
    backgroundColor: Colors.White,
    padding: 20,
    margin: 20,
    borderRadius: 10,
    shadowColor: Colors.Black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  countContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
