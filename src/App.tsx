import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider } from 'react-redux'
import { store } from './store/store'
import { Toaster } from "@/components/ui/toaster"

// Import all pages
import Index from "@/pages/Index"
import { Explore } from "@/pages/Explore"
import PostDetail from "@/pages/PostDetail"
import Profile from "@/pages/Profile"
import UserPosts from "@/pages/profile/UserPosts"
import UserFollowing from "@/pages/profile/UserFollowing"
import UserFollowers from "@/pages/profile/UserFollowers"
import EditProfile from "@/pages/EditProfile"
import ProductDetail from "@/pages/ProductDetail"
import Favorites from "@/pages/Favorites"
import Cart from "@/pages/Cart"
import Orders from "@/pages/Orders"
import OrderDetail from "@/pages/OrderDetail"
import Checkout from "@/pages/Checkout"
import CreatePost from "@/pages/CreatePost"
import SearchResults from "@/pages/SearchResults"
import AddressForm from "@/pages/AddressForm"
import AddressList from "@/pages/AddressList"
import Notifications from "@/pages/Notifications"

const queryClient = new QueryClient()

// Check if we're in Taro environment
const isTaro = typeof process !== 'undefined' && process.env.TARO_ENV !== undefined

function AppContent() {
  return (
    <div className="app">
      {!isTaro ? (
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/posts" element={<UserPosts />} />
          <Route path="/profile/following" element={<UserFollowing />} />
          <Route path="/profile/followers" element={<UserFollowers />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/search/results" element={<SearchResults />} />
          <Route path="/address" element={<AddressList />} />
          <Route path="/address/new" element={<AddressForm />} />
          <Route path="/address/edit/:id" element={<AddressForm />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      ) : (
        // For Taro, render the current page based on route
        <Index />
      )}
      <Toaster />
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        {isTaro ? (
          <AppContent />
        ) : (
          <Router>
            <AppContent />
          </Router>
        )}
      </Provider>
    </QueryClientProvider>
  )
}

export default App