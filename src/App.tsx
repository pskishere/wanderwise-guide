import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import Index from "@/pages/Index"
import { Explore } from "@/pages/Explore"
import PostDetail from "@/pages/PostDetail"
import Profile from "@/pages/Profile"
import ProductDetail from "@/pages/ProductDetail"
import Favorites from "@/pages/Favorites"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
          <Toaster />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App