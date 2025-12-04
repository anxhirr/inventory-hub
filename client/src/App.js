import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Products from "./components/Products";
import FinalProducts from "./components/FinalProducts";
import Categories from "./components/Categories";
import Settings from "./components/Settings";
import { NotificationProvider } from "./context/NotificationContext";
import { CurrencyProvider } from "./context/CurrencyContext";

function App() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <NotificationProvider>
      <CurrencyProvider>
        <Router>
          <div className="App">
            <nav className="navbar">
              <div className="nav-container">
                <h1 className="nav-logo">
                  <img
                    src="https://skaitech.al/wp-content/uploads/2024/03/icons8-source-code-100.png"
                    alt="Logo"
                    style={{ marginRight: "12px", verticalAlign: "middle", cursor: "pointer" }}
                    onClick={() => window.location.reload()}
                  />
                  <span style={{ verticalAlign: "middle" }}>Koli Duroplast</span>
                </h1>
                <div className="nav-right">
                  <div className="nav-links">
                    <Link to="/" className="nav-link">
                      Products
                    </Link>
                    {/* <Link to="/categories" className="nav-link">
                      Categories
                    </Link> */}
                    <Link to="/final-products" className="nav-link">
                      Final Products
                    </Link>
                  </div>
                  <button
                    className="settings-icon-btn"
                    onClick={() => setShowSettings(true)}
                    title="Settings"
                  >
                    <span>⚙</span>
                  </button>
                </div>
              </div>
            </nav>

            <main className="main-content">
              <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/final-products" element={<FinalProducts />} />
              </Routes>
            </main>
            <footer className="app-footer">
              <p>
                Made by{" "}
                <a
                  href="https://inert.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  inerttila
                </a>
              </p>
            </footer>
            {showSettings && (
              <Settings onClose={() => setShowSettings(false)} />
            )}
          </div>
        </Router>
      </CurrencyProvider>
    </NotificationProvider>
  );
}

export default App;
