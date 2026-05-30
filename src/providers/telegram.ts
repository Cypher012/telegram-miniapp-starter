import {
	bindMiniAppCssVars,
	bindThemeParamsCssVars,
	bindViewportCssVars,
	expandViewport,
	init,
	isTMA,
	miniAppReady,
	mockTelegramEnv,
	mountMiniAppSync,
	mountThemeParamsSync,
	mountViewport,
} from "@telegram-apps/sdk";

let didMockTelegram = false;

function applyDevelopmentTelegramMock() {
	if (!import.meta.env.DEV || didMockTelegram || isTMA()) {
		return;
	}

	didMockTelegram = true;

	mockTelegramEnv({
		launchParams: {
			tgWebAppData: new URLSearchParams([
				["auth_date", String(Math.floor(Date.now() / 1000))],
				["hash", "dev-hash"],
				[
					"user",
					JSON.stringify({
						id: 100000001,
						first_name: "Dev",
						last_name: "User",
						username: "telegram_dev",
						language_code: "en",
						is_premium: true,
					}),
				],
			]),
			tgWebAppPlatform: "web",
			tgWebAppThemeParams: {
				bg_color: "#212121",
				text_color: "#ffffff",
				hint_color: "#aaaaaa",
				link_color: "#8774e1",
				button_color: "#8774e1",
				button_text_color: "#ffffff",
				secondary_bg_color: "#0f0f0f",
				header_bg_color: "#212121",
				accent_text_color: "#8774e1",
				section_bg_color: "#212121",
				section_header_text_color: "#aaaaaa",
				subtitle_text_color: "#aaaaaa",
				destructive_text_color: "#e53935",
			},
			tgWebAppVersion: "8.0",
		},
	});
}

function callIfAvailable(
	method: { isAvailable?: () => boolean } & (() => unknown),
) {
	if (!method.isAvailable || method.isAvailable()) {
		method();
	}
}

export function initTelegram() {
	try {
		applyDevelopmentTelegramMock();
		init();
		callIfAvailable(mountThemeParamsSync);
		callIfAvailable(bindThemeParamsCssVars);
		callIfAvailable(mountMiniAppSync);
		callIfAvailable(bindMiniAppCssVars);
		callIfAvailable(mountViewport);
		callIfAvailable(bindViewportCssVars);
		callIfAvailable(expandViewport);
		callIfAvailable(miniAppReady);
	} catch (error) {
		console.warn("Telegram SDK started in browser fallback mode", error);
	}
}
