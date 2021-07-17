import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux';

import globalStyles from '../styles/global';
import { Colors } from '../constants';
import CustomButton from '../components/CustomButton';
import Tasks from '../components/Tasks';
import { getTasks } from '../store/actions/taskActions';
import { setActiveListId } from '../store/actions/listActions';

const ListScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const { id } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks(() => setLoading(false)));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setActiveListId(id));
  }, [dispatch, id]);

  if (loading) {
    return <ActivityIndicator color={Colors.primary} size="large" style={globalStyles.loader} />;
  }
  
  return (
    <ImageBackground 
        source={require('../assets/bg1.jpg')} 
        style={styles.bgimage}>
      <View style={styles.container}>
        <Tasks navigation={navigation} listId={id} />
        <CustomButton text="Add new task" icon="add" iconColor="#fff" onPress={() => navigation.navigate('NewTask')} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  bgimage: {
    flex: 1,    
    resizeMode: "center",
    justifyContent: "center",
    width:400,
    height:710,
  },
});

export default ListScreen;