// https://66eb202855ad32cda47bc47e.mockapi.io
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthHeader } from "../auth/operations";

// axios.defaults.baseURL = "https://66eb202855ad32cda47bc47e.mockapi.io";
axios.defaults.baseURL = "https://connections-api.goit.global/";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/contacts");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact, thunkAPI) => {
    try {
      const { data } = await axios.post("/contacts", newContact);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/contacts/${contactId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const changeContact = createAsyncThunk(
//   "contacts/changeContact",
//   async (contactId, thunkApi) => {
//     try {
//       const { data } = await axios.patch(`/contacts/${contactId}`);
//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

export const changeContact = createAsyncThunk(
  "contacts/changeContact",
  async ({ contactId, updatedContact }, thunkApi) => {
    try {
      const reduxState = thunkApi.getState();
      setAuthHeader(reduxState.auth.token); // Устанавливаем токен
      const { data } = await axios.patch(
        `/contacts/${contactId}`,
        updatedContact
      );
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
