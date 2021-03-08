import * as api from '../api';

import { FETCH_ALL, CREATE, DELETE, UPDATE, LIKE } from './actionTypes';

// Action Creators

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    // dispatch(action) ie.
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (err) {
    console.log(err.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    // dispatch(action) ie.
    dispatch({ type: CREATE, payload: data });
  } catch (err) {
    console.log(err.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    // dispatch(action) ie.
    dispatch({ type: UPDATE, payload: data });
  } catch (err) {
    console.log(err.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    // dispatch(action) ie.
    dispatch({ type: DELETE, payload: id });
  } catch (err) {
    console.log(err.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    // dispatch(action) ie.
    dispatch({ type: LIKE, payload: data });
  } catch (err) {
    console.log(err.message);
  }
};
