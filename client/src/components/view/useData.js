import { useState, useEffect } from 'react';
const API_URL="https://task-management-wqn5.onrender.com"
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/${url}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result);
        setLoading(false)
      } catch (error) {
        setError(error);
        setLoading(false)
      } 
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
