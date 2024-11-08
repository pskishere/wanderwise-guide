import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { supabase } from "@/integrations/supabase/client"

export interface Address {
  id: string
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  isDefault: boolean
}

interface AddressState {
  addresses: Address[]
  loading: boolean
  error: string | null
}

const initialState: AddressState = {
  addresses: [],
  loading: false,
  error: null
}

export const fetchAddresses = createAsyncThunk(
  'address/fetchAddresses',
  async () => {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: false })

    if (error) throw error

    return data.map(addr => ({
      id: addr.id.toString(),
      name: addr.name,
      phone: addr.phone,
      province: addr.province,
      city: addr.city,
      district: addr.district,
      detail: addr.detail,
      isDefault: addr.is_default || false
    }))
  }
)

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
    },
    setDefaultAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === action.payload
      }))
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false
        state.addresses = action.payload
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch addresses'
      })
  }
})

export const { 
  setLoading, 
  setError, 
  addAddress, 
  updateAddress, 
  deleteAddress,
  setDefaultAddress 
} = addressSlice.actions

export default addressSlice.reducer