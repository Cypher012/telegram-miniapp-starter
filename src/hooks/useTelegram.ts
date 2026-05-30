import { useLaunchParams, useRawInitData } from "@telegram-apps/sdk-react";

type TelegramUser = {
	firstName?: string;
	id?: number;
	isPremium?: boolean;
	lastName?: string;
	languageCode?: string;
	username?: string;
};

export function useTelegram() {
	const launchParams = useLaunchParams();
	const rawInitData = useRawInitData();
	const user = launchParams.tgWebAppData?.user as TelegramUser | undefined;

	return {
		initData: launchParams.tgWebAppData,
		isTelegram: Boolean(rawInitData),
		platform: launchParams.tgWebAppPlatform,
		rawInitData,
		startParam:
			launchParams.tgWebAppStartParam ??
			launchParams.tgWebAppData?.startParam ??
			"",
		themeParams: launchParams.tgWebAppThemeParams,
		user,
	};
}
