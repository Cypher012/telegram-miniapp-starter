import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import { apiFetch } from "#/lib/api";

type ApiQueryOptions<T> = Omit<
	UseQueryOptions<T, Error, T, readonly unknown[]>,
	"queryFn" | "queryKey"
> & {
	path: string;
	queryKey: readonly unknown[];
	telegramAuth?: boolean;
};

export function useApiQuery<T>({
	path,
	queryKey,
	telegramAuth,
	...options
}: ApiQueryOptions<T>) {
	return useQuery({
		...options,
		queryKey,
		queryFn: () => apiFetch<T>(path, { telegramAuth }),
	});
}
