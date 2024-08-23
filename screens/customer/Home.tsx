import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {CollectionNames, Colors, Roles, ScreenNames} from '../../lib/constants';
import MapView, {Marker} from 'react-native-maps';
import SmallCard from '../../lib/components/SmallCard';
import {userContext} from '../../lib/context/userContext';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../lib/components/Loader';

const CustomerHome = ({navigation}: any) => {
  const {user} = useContext(userContext);
  const [tailors, setTailors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const NoTailorsFound = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: Colors.Primary, fontSize: 20, fontWeight: 'bold'}}>
          No Recent Tailors Found
        </Text>
      </View>
    );
  };

  const SingleTailorCard = ({tailor}: any) => {
    return (
      <TouchableHighlight
        style={styles.singleTailorCard}
        onPress={() => {
          navigation.popToTop();
          navigation.navigate(ScreenNames.TailorProfileView, {tailor});
        }}>
        <>
          <Text style={styles.singleTailorCardBiggerText}>{tailor.name}</Text>
          <Text style={styles.singleTailorText}>{tailor.email}</Text>
          <Text style={styles.singleTailorText}>{tailor.distance} KM Away</Text>
        </>
      </TouchableHighlight>
    );
  };

  const getRecentTailorViews = async () => {
    try {
      const snapshot = await firestore()
        .collection(CollectionNames.TailorViews)
        .orderBy('createdAt', 'desc')
        .limit(5)
        .get();

      const fakeSnapshot = [
        {
          name: 'Tailor 1',
          email: 'tailor1@gmail.com',
          distance: 2,
        },
        {
          name: 'Tailor 2',
          email: 'tailor2@gmail.com',
          distance: 1,
        },
        {
          name: 'Tailor 3',
          email: 'tailor3@gmail.com',
          distance: 3,
        },
        {
          name: 'Tailor 4',
          email: 'tailor4@gmail.com',
          distance: 5,
        },
        {
          name: 'Tailor 5',
          email: 'tailor5@gmail.com',
          distance: 4,
        },
      ];

      setTailors(fakeSnapshot);

      // if (snapshot.empty) {
      //   // if no recent tailor views
      //   setIsLoading(false);
      //   return;
      // }
      // setTailors(snapshot.docs.map(doc => doc.data()));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('Error getting recent tailor views', error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getRecentTailorViews(); // get recent tailor views
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Welcome {user.name} </Text>
      </View>
      {/* Recent Tailor Views With Map */}
      {tailors.length > 0 ? (
        <ScrollView>
          {tailors.map((tailor, index) => (
            <SingleTailorCard key={index} tailor={tailor} />
          ))}
        </ScrollView>
      ) : (
        <NoTailorsFound />
      )}
    </View>
  );
};

export default CustomerHome;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.Secondary,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
    backgroundColor: Colors.Primary,
  },
  headingText: {
    color: Colors.Secondary,
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  singleTailorCard: {
    margin: 10,
    backgroundColor: Colors.White,
    padding: 10,
    borderRadius: 10,
  },
  singleTailorText: {
    color: Colors.Black,
    fontSize: 16,
  },
  singleTailorCardBiggerText: {
    color: Colors.Primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
