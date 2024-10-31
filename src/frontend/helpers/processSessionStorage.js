export const setSessionStorage = (key, value, ttl) => {
    const now = new Date();

    // Create an object with the data and the expiration time
    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    };

    // Store the object in session storage as a string
    sessionStorage.setItem(key, JSON.stringify(item));
};

export const getSessionStorage = (key) => {
    const itemStr = sessionStorage.getItem(key);
    // If the item doesn't exist, return null
    if (!itemStr) {
        return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    // If the item has expired, remove it from storage and return null
    if (now.getTime() > item.expiry) {
        sessionStorage.removeItem(key);
        return "expired";
    }

    return item.value;
};
