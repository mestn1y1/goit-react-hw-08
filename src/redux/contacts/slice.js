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
      state.currentContact = null; // Reset current contact
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
        const updatedContact = action.payload; // Получаем обновленные данные из payload

        state.items = state.items.map(
          (contact) =>
            contact.id === updatedContact.id ? updatedContact : contact // Если id совпадает, возвращаем обновленный контакт, иначе - оригинальный
        );
        // Сбрасываем текущий контакт после обновления
      })

      .addCase(logOut.fulfilled, () => {
        return initialState;
      });
  },
});

export default contactsSlice.reducer;
export const { resetCurrentContact } = contactsSlice.actions;

// export const selectIsLoading = (state) => state.contacts.loading;

// export const selectIsError = (state) => state.contacts.error;

// export const selectContacts = (state) => state.contacts.items;

// export const selectVisibleContacts = createSelector(
//   [selectContacts, selectFilter],
//   (contacts, filter) => {
//     return contacts.filter((contact) =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     );
//   }
// );
