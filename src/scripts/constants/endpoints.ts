import { CONFIGS } from "@scripts/constants/configs";

export const ENDPOINTS = {
	LIST: `${CONFIGS.API_BASE_URL}list`,
	DETAIL: (id: string) =>
		`${CONFIGS.API_BASE_URL}detail/${id}`,
	REVIEW: `${CONFIGS.API_BASE_URL}review`,
};
