import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { useRef } from 'react';

const getMyLocation = async() => {
  let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      const { latitude, longitude } = (await Location.getCurrentPositionAsync({})).coords;

      const region = {
        latitude,
        longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
      return region;
}

export default function App() {

  const mapRef = useRef(null);

  const goToMyLocation = async() => {
    const region = await getMyLocation();
    region && mapRef.current?.animateToRegion(region, 1000);
  }

  return (
    <View style={{flex: 1}}>
      <StatusBar style="auto" />
        <MapView
          style={styles.map}
          ref={mapRef}
          onMapReady={() => {goToMyLocation();}}
          showsUserLocation
            />
        <View style={styles.searchArea}>
          <TextInput style={styles.searchInput} placeholder='Encontre um lugar' />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchArea: {
    position: 'absolute',
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#999',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: '100%',
    bottom: 0
  },

  map: {
    width: '100%',
    height: '100%',
  },
});
