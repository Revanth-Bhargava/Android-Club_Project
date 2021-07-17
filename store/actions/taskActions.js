import AsyncStorage from '@react-native-async-storage/async-storage';

import { SET_TASKS } from '../types';
import { STORAGE_KEYS } from '../../constants';
import store from '../';

// Get tasks
export const getTasks = (onSuccess = () => {}, onError = () => {}) => {
  return async dispatch => {
    try {
      const tasksRes = await AsyncStorage.getItem(STORAGE_KEYS.tasks);
      const tasks = tasksRes ? JSON.parse(tasksRes) : [];

      dispatch({
        type: SET_TASKS,
        payload: tasks,
      });
      onSuccess();
    } catch (err) {
      console.log(err);
      onError();
    }
  };
};

// Create task
export const createTask = (name, listId, onSuccess = () => {}, onError = () => {}) => {
  return async dispatch => {
    try {
      const newTask = {
        name,
        listId,
        id: `task-${new Date().getTime()}`,
        completed: false,
      };

      const { tasks } = store.getState().task;

      const tasksCopy = [...tasks];
      tasksCopy.push(newTask);
      await AsyncStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(tasksCopy));

      dispatch({
        type: SET_TASKS,
        payload: tasksCopy,
      });
      onSuccess();
    } catch (err) {
      console.log(err);
      onError();
    }
  };
};

// Update task
export const updateTask = (task, onSuccess = () => {}, onError = () => {}) => {
  return async dispatch => {
    try {
      const { tasks } = store.getState().task;
      const updatedTasks = [...tasks].map(t => t.id === task.id ? task : t);
      await AsyncStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(updatedTasks));

      dispatch({
        type: SET_TASKS,
        payload: updatedTasks,
      });
      onSuccess();
    } catch (err) {
      console.log(err);
      onError();
    }
  };
};

// Delete task
export const deleteTask = (id, onSuccess = () => {}, onError = () => {}) => {
  return async dispatch => {
    try {
      const { tasks } = store.getState().task;
      const updatedTasks = [...tasks].filter(t => t.id !== id);
      await AsyncStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(updatedTasks));

      dispatch({
        type: SET_TASKS,
        payload: updatedTasks,
      });
      onSuccess();
    } catch (err) {
      console.log(err);
      onError();
    }
  };
};