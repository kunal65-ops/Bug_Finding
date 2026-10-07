import { useState, useEffect } from 'react';
import { fetchTasks } from '../api';

export function useTasks(query, status, page, pageSize) {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Set by the cleanup below so a response from an older request is dropped
    let ignore = false;

    setLoading(true);
    setError(null);

    fetchTasks({ query, status, page, pageSize })
      .then((data) => {
        if (ignore) return;
        setTasks(data.items);
        setTotal(data.total);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [query, status, page, pageSize]);

  return { tasks, total, loading, error };
}
