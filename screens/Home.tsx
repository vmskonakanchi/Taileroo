import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SelectCard from '../lib/components/SelectCard';
import {Colors, ScreenNames} from '../lib/constants';

type HomeProps = {
  navigation: any;
};

const userTypes = ['Customer', 'Tailor'];

const Home = ({navigation}: HomeProps) => {
  const handlePress = (userType: 'Tailor' | 'Customer') => {
    navigation.navigate(ScreenNames.Login, {userType});
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>Select The User Type To Continue</Text>
        {userTypes.map(userType => (
          <SelectCard
            key={userType}
            title={userType}
            onPress={() => {
              handlePress(userType as 'Tailor' | 'Customer');
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: Colors.Secondary,
    gap: 20,
  },
  text: {
    fontSize: 20,
    maxWidth: '50%',
    textAlign: 'center',
    color: Colors.Primary,
  },
});
