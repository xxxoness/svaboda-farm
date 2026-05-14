import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import Company from './pages/Company'
import Support from './pages/Support'
import Legal from './pages/Legal'
import Warehouse from './pages/Warehouse'
import Checkout from './pages/Checkout'
import Admin from './pages/Admin'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="company" element={<Company />} />
          <Route path="support" element={<Support />} />
          <Route path="legal" element={<Legal />} />
          <Route path="warehouse" element={<Warehouse />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
