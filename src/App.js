import './App.css';
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashbaord/Dashboard'
import Footer from './components/Footer/Footer';
import Book from './pages/Book';
import SearchBooks from './pages/BrowseBooks';
import Login from './pages/Login';
import Cart from './pages/MyCart'
import Wishlist from './pages/Wishlist'
import SellBook from './pages/SellBook';
import PopularBooks from './pages/PopularBooks';
import Signup from './pages/Signup';
import ProfilePage from './pages/ProfilePage';
import OtpValidation from './pages/OtpValidation';
import AddUser from './pages/AddUser'
import CategorizedBooks from './pages/categorizedBooks';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/browseBooks" element={<SearchBooks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/wishlist" element={<Wishlist/>} />
          <Route path="/book/:bookId" element={<Book />} />
          <Route path="/popularBooks" element={<PopularBooks/>} />
          <Route path="/SellBook" element={<SellBook/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/optvalidation" element={<OtpValidation/>} />
          <Route path="/addUser" element={<AddUser/>} />
          <Route path="/categorizedBooks" element={<CategorizedBooks/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
