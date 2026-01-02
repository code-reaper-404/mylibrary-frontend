import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./helpers/PrivateRoute";
import PublicRoute from "./helpers/PublicRoute";
import Navbar from "./components/Navbar/Navbar";
import History from "./pages/History";
import Notes from "./pages/Notes";
import Wishlist from "./pages/Wishlist";
import BookShelf from "./pages/BookShelf";
import Account from "./pages/Account"
import Genres from "./pages/Genres";
import BookPage from "./pages/BookPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddBooks from "./components/AddBook/AddBook";


function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={2000} style={{ zIndex: 9999999999 }} />
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
        />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
        />

        {/* Private Routes */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
        />
        <Route path="/history" element={
          <PrivateRoute>
            <History />
          </PrivateRoute>
        }
        />
        <Route path="/notes" element={
          <PrivateRoute>
            <Notes />
          </PrivateRoute>
        }
        />
        <Route path="/wish-list" element={
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        }
        />
        <Route path="/book-shelf" element={
          <PrivateRoute>
            <BookShelf />
          </PrivateRoute>
        }
        />
        <Route path="/add-book" element={
          <PrivateRoute>
            <AddBooks />
          </PrivateRoute>
        }
        />
        <Route path="/add-book/:id" element={
          <PrivateRoute>
            <AddBooks />
          </PrivateRoute>
        }
        />
        <Route path="/book/:id" element={
          <PrivateRoute>
            <BookPage />
          </PrivateRoute>
        }
        />
        <Route path="/genres" element={
          <PrivateRoute>
            <Genres />
          </PrivateRoute>
        }
        />
        <Route path="/myaccount" element={
          <PrivateRoute>
            <Account />
          </PrivateRoute>
        }
        />

        <Route path="*" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
        />
      </Routes>

    </Router>
  );
}

export default App;