import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/toaster"
import { Provider } from 'react-redux'
import { store } from './store/store'
import Index from "@/pages/Index"
import { Explore } from "@/pages/Explore"
import PostDetail from "@/pages/PostDetail"
import Profile from "@/pages/Profile"
import EditProfile from "@/pages/EditProfile"
import ProductDetail from "@/pages/ProductDetail"
import Favorites from "@/pages/Favorites"
import Messages from "@/pages/Messages"
import Cart from "@/pages/Cart"
import Orders from "@/pages/Orders"
import OrderDetail from "@/pages/OrderDetail"
import Checkout from "@/pages/Checkout"
import CreatePost from "@/pages/CreatePost"
import SearchResults from "@/pages/SearchResults"
import AddressForm from "@/pages/AddressForm"
import AddressList from "@/pages/AddressList"

const queryClient = new QueryClient()

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/search/results" element={<SearchResults />} />
            <Route path="/address" element={<AddressList />} />
            <Route path="/address/new" element={<AddressForm />} />
            <Route path="/address/edit/:id" element={<AddressForm />} />
          </Routes>
          <Toaster />
        </Router>
      </QueryClientProvider>
    </Provider>
  )
}

export default App