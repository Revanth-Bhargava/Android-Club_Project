import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity, ImageBackground } from 'react-native';
import { List, Switch } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { Colors } from '../constants';

import { getLists } from '../store/actions/listActions';
import globalStyles from '../styles/global';
import Lists from '../components/Lists';
import CustomButton from '../components/CustomButton';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLists(() => setLoading(false)));
  }, [dispatch]);

  if (loading) {
    return <ActivityIndicator color={Colors.primary} size="large" style={globalStyles.loader} />;
  }
  
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../assets/bg.jpg')} 
        style={styles.bgimage}>
      <Lists navigation={navigation}/>
      <CustomButton text="Add List" icon="add-circle-outline" iconColor="#fff" onPress={() => navigation.navigate('NewList')}/>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgimage: {
    flex: 1,    
    resizeMode: "center",
    justifyContent: "center",
    width:400,
    height:710,
  },
});

export default HomeScreen;