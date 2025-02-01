import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals.js";
import "./i18n";
import { configureStoreWithSaga } from "./store/store";

const store = configureStoreWithSaga({});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <React.Fragment>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </React.Fragment>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
