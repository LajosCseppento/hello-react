import {useEffect, useState} from 'react';

// TODO
const useFetch = (url: string) => {
const [data, setData] = useState(null);
const [pending, setPending] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
return () => {};
}, []);

return {
data,
pending,
error,
};
};

export default useFetch;
