export const clearSessionStorage = (keys: string[]) => {
	keys.forEach((key) => sessionStorage.removeItem(key));
};
