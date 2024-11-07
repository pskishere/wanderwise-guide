import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Address {
  id: string
  name: string
  phone: string
  detail: string
  isDefault: boolean
}

interface AddressState {
  addresses: Address[]
  loading: boolean
  error: string | null
}

const initialState: AddressState = {
  addresses: [
    {
      id: "1",
      name: "张三",
      phone: "138****8888",
      detail: "文三路 123 号",
      isDefault: true
    }
  ],
  loading: false,
  error: null
}

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    addAddress: (state, action: PayloadAction<Address>) => {
      state.addresses.push(action.payload)
    },
    updateAddress: (state, action: PayloadAction<Address>) => {
      const index = state.addresses.findIndex(addr => addr.id === action.payload.id)
      if (index !== -1) {
        state.addresses[index] = action.payload
      }
    },
    deleteAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.filter(addr => addr.id !== action.payload)
    }
  }
})

export const { 
  setLoading, 
  setError, 
  addAddress, 
  updateAddress, 
  deleteAddress 
} = addressSlice.actions

export default addressSlice.reducer