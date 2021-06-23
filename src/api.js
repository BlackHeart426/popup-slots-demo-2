export const getUserList = (offset, limit) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts?_start=${offset}&_limit=${limit}`)
};
