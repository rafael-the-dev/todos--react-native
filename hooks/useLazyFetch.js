import { useCallback, useState, useTransition } from "react";


export const useLazyFetch = () => {
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ , startTransition ] = useTransition();

    const lazyFetch = useCallback(({ onError, options, onSuccess, url }) => {
        setLoading(true);
        
        fetch(url, options)
            .then(res => res.json())
            .then(res => {
                setData(res);
                startTransition(() => {
                    setLoading(false);
                    if(onSuccess) onSuccess();
                })
            })
            .catch(err => {
                setError(err);
                startTransition(() => {
                    setLoading(false);
                    if(onError) onError();
                })
            })
    }, []);

    return { data, error, lazyFetch, loading };
};