import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Product {
  id: number
  title: string
  price: string
  originalPrice?: string
  description: string
  images: string[]
  shop: {
    name: string
    avatar: string
  }
  specs?: {
    name: string
    options: string[]
  }[]
}

interface ProductState {
  products: Product[]
  loading: boolean
  error: string | null
}

const initialState: ProductState = {
  products: [
    {
      id: 1,
      title: "ZARA 2024春季新款小香风粗花呢外套",
      price: "¥799",
      originalPrice: "¥999",
      description: "这是一款经典的小香风外套，采用高级粗花呢面料，手感柔软，保暖性能出色。简约的设计风格，搭配金属纽扣，既能突出品质感，又不失优雅。",
      images: [
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
        "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=800&q=80",
      ],
      shop: {
        name: "ZARA官方旗舰店",
        avatar: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80"
      },
      specs: [
        {
          name: "颜色",
          options: ["米白色", "黑色", "粉色"]
        },
        {
          name: "尺码",
          options: ["S", "M", "L", "XL"]
        }
      ]
    }
  ],
  loading: false,
  error: null
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
    }
  }
})

export const { setLoading, setError, setProducts } = productSlice.actions
export default productSlice.reducer