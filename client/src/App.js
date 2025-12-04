import { StackHandler, StackProvider, StackTheme } from "@stackframe/react";
import React, { useState } from "react";
import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Categories from "./components/Categories";
import FinalProducts from "./components/FinalProducts";
import Products from "./components/Products";
import Settings from "./components/Settings";
import { CurrencyProvider } from "./context/CurrencyContext";
import { NotificationProvider } from "./context/NotificationContext";
import { stackClientApp } from "./stack/client";

function HandlerRoutes() {
  const location = useLocation();

  return (
    <StackHandler app={stackClientApp} location={location.pathname} fullPage />
  );
}

function App() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <NotificationProvider>
      <CurrencyProvider>
        <Router>
          <StackProvider app={stackClientApp}>
            <StackTheme>
              <div className="App">
                <nav className="navbar">
                  <div className="nav-container">
                    <h1 className="nav-logo">
                      <img
                        src="https://skaitech.al/wp-content/uploads/2024/03/icons8-source-code-100.png"
                        alt="Logo"
                        style={{
                          marginRight: "12px",
                          verticalAlign: "middle",
                          cursor: "pointer",
                        }}
                        onClick={() => window.location.reload()}
                      />
                      <span style={{ verticalAlign: "middle" }}>
                        Koli Duroplast
                      </span>
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
                    <Route path="/handler/*" element={<HandlerRoutes />} />
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
            </StackTheme>
          </StackProvider>
        </Router>
      </CurrencyProvider>
    </NotificationProvider>
  );
}

export default App;
