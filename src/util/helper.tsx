export class InvalidTokenError extends Error {}

InvalidTokenError.prototype.name = "InvalidTokenError";

export const clearSessionStorage = (keys: string[]) => {
	keys.forEach((key) => sessionStorage.removeItem(key));
};

export const isAuthenticated = () => {
	const token = localStorage.getItem("token");
	return !!token;
};
