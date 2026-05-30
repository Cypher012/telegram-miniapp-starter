import {
	type QueryKey,
	type UseMutationOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import type { Method } from "axios";
import { apiFetch } from "#/lib/api";

type ApiMutationOptions<TData, TVariables> = Omit<
	UseMutationOptions<TData, Error, TVariables>,
	"mutationFn"
> & {
	invalidateQueries?: QueryKey[];
	method?: Method;
	path: string;
	telegramAuth?: boolean;
};

export function useApiMutation<TData, TVariables = unknown>({
	invalidateQueries,
	method = "POST",
	path,
	telegramAuth,
	...options
}: ApiMutationOptions<TData, TVariables>) {
	const queryClient = useQueryClient();

	return useMutation({
		...options,
		mutationFn: (body: TVariables) =>
			apiFetch<TData>(path, {
				body,
				method,
				telegramAuth,
			}),
		onSuccess: async (data, variables, onMutateResult, context) => {
			await Promise.all(
				invalidateQueries?.map((queryKey) =>
					queryClient.invalidateQueries({ queryKey }),
				) ?? [],
			);

			await options.onSuccess?.(data, variables, onMutateResult, context);
		},
	});
}
