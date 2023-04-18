import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { disableReactDevTools } from "./util/disableDevTools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</React.StrictMode>
);
