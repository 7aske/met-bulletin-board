/**
 * Check if environment is production.
 */
export const isDev = (): boolean => {
	return process.env.NODE_ENV === "dev";
};
