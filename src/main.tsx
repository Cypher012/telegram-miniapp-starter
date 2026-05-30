import { RouterProvider } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { QueryProvider } from "./providers/query";
import { initTelegram } from "./providers/telegram";
import { getRouter } from "./router";

initTelegram();

const rootElement = document.getElementById("app");
const router = getRouter();

if (!rootElement) {
	throw new Error("Root element #app was not found");
}

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<QueryProvider>
			<RouterProvider router={router} />
		</QueryProvider>,
	);
}
