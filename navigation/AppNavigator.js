import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet, Alert, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';

import HomeScreen from '../screens/HomeScreen';
import AddListScreen from '../screens/AddListScreen';
import ListScreen from '../screens/ListScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import TaskScreen from '../screens/TaskScreen';
import { Colors } from '../constants';
import { deleteList } from '../store/actions/listActions';

const TasksStackNavigator = createStackNavigator();

const defaultStyles = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontFamily: 'Poppins-Regular',
  },
};

const styles = StyleSheet.create({
  headerRightSpace: {
    marginRight: 10,
  },
});

const TasksNavigator = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector(state => state.task);

  const deleteListClickHandler = (id, navigation) => {
    const listHasTasks = tasks.find(t => t.listId === id);

    if (listHasTasks) {
      return Alert.alert('Cannot delete', 'List cannot be deleted because it is not empty. First delete tasks in this list!!!');
    }

    Alert.alert(
      'Delete list',
      'Are you sure you want to delete this list ?',
      [
        { text: 'Cancel' },
        { text: 'Delete', onPress: () => deleteListHandler(id, navigation) },
      ]
    );
  };

  const deleteListHandler = (id, navigation) => {
    dispatch(deleteList(id, () => {
      navigation.goBack();
      ToastAndroid.show('List successfully deleted!', ToastAndroid.LONG);
    }));
  };

  return (
    <TasksStackNavigator.Navigator>
      <TasksStackNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{ ...defaultStyles, title: 'MY LISTS', headerTitleAlign: 'center' }}
      />
      <TasksStackNavigator.Screen
        name="NewList"
        component={AddListScreen}
        options={{ ...defaultStyles, title: 'Add List' }}
      />
      <TasksStackNavigator.Screen
        name="List"
        component={ListScreen}
        options={({ route, navigation }) => ({ 
          ...defaultStyles,
          title: route.params.name,
          headerRight: () => (
            <View style={styles.headerRightSpace}>
              <Icon
                name="md-trash"
                color="#fff"
                size={30}
                onPress={() => deleteListClickHandler(route.params.id, navigation)}
              />
            </View>
          ),
        })}
      />
      <TasksStackNavigator.Screen
        name="NewTask"
        component={AddTaskScreen}
        options={{ ...defaultStyles, title: 'ADD TASK' }}
      />
      <TasksStackNavigator.Screen
        name="Task"
        component={TaskScreen}
        options={{ ...defaultStyles, title: 'EDIT TASK' }}
      />
    </TasksStackNavigator.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <TasksNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;