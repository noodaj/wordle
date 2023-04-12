import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { disableReactDevTools } from "./util/disableDevTools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
