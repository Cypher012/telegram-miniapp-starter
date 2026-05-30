import { retrieveRawInitData } from "@telegram-apps/sdk";
import axios, { AxiosHeaders, type AxiosRequestConfig } from "axios";
import { env } from "./env";

declare module "axios" {
	interface InternalAxiosRequestConfig {
		telegramAuth?: boolean;
	}
}

type ApiOptions = Omit<AxiosRequestConfig, "baseURL" | "url"> & {
	body?: unknown;
	telegramAuth?: boolean;
};

export const api = axios.create({
	baseURL: env.apiUrl,
});

api.interceptors.request.use((config) => {
	const headers = AxiosHeaders.from(config.headers);
	const shouldAuthorize = config.telegramAuth !== false;

	headers.set("Content-Type", "application/json");

	if (shouldAuthorize) {
		const initData = getTelegramInitData();

		if (initData) {
			headers.set("Authorization", `tma ${initData}`);
		}
	}

	config.headers = headers;
	delete config.telegramAuth;

	return config;
});

export async function apiFetch<T>(path: string, options: ApiOptions = {}) {
	const { body, data, ...requestOptions } = options;

	const response = await api.request<T>({
		...requestOptions,
		data: body ?? data,
		url: path,
	});

	return response.data;
}

function getTelegramInitData() {
	try {
		return retrieveRawInitData();
	} catch {
		return undefined;
	}
}
