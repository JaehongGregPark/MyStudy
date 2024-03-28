import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import App from "./App";

Sentry.init({ dsn: "https://7d2f4b9c3a0847528cbd0c1ee80ea2ab@o807744.ingest.sentry.io/5803725" });

ReactDOM.render(<App />, document.getElementById("root"));

// Can also use with React Concurrent Mode
// ReactDOM.createRoot(document.getElementById('root')).render(<App />);