import { SnackbarProvider } from "notistack";
import React from "react";
import Routes from "./Routes/index";

function App() {
  return (
    <React.Fragment>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        autoHideDuration={3000}
        style={{ marginBottom: "2rem", zIndex: "9999" }}
      >
        <Routes />
      </SnackbarProvider>
    </React.Fragment>
  );
}

export default App;
