import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  changeContact,
} from "./operations";
import { logOut } from "../auth/operations";

const initialState = {
  items: [],
  currentContact: null,
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    // updateContact: (state, action) => {
    //   state.items = state.items.map((item) =>
    //     item.id === action.payload.id ? { ...item, ...action.payload } : item
    //   );
    // },
    resetCurrentContact: (state) => {
      state.currentContact = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(addContact.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload.id
        );
        state.loading = false;
      })
      .addCase(deleteContact.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      // .addCase(changeContact.fulfilled, (state, action) => {
      //   state.currentContact = action.payload;
      // })
      .addCase(changeContact.fulfilled, (state, action) => {
        state.currentContact = action.payload;
      })
      .addCase("contacts/updateContactList", (state) => {
        if (state.currentContact) {
          state.items = state.items.map((contact) =>
            contact.id === state.currentContact.id
              ? state.currentContact
              : contact
          );
          state.currentContact = null; // Сбрасываем текущий контакт
        }
      })
      .addCase(logOut.fulfilled, () => {
        return initialState;
      });
  },
});

export default contactsSlice.reducer;
export const { resetCurrentContact } = contactsSlice.actions;
