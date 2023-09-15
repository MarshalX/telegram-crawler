const { user } = window.Telegram.WebApp.initDataUnsafe;

const userId = user?.id;

export const withUserId = (key: string) => (userId ? `${userId}:${key}` : key);
