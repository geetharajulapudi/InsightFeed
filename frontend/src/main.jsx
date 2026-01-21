import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

// Entry point of the React application.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  // Wrapping the App component with Redux Provider and React Router's BrowserRouter.
  <Provider store = {store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
);
