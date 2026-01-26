import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const useGet = ({ url }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const res = await axios.get(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/${url}`);
      setData(res?.data);
    } catch (error) {
      toast.error(error?.message || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true; 

    if (mounted) {
      getData();
    }

    return () => {
      mounted = false; 
    };
  }, [url]);

  return { data, setData, getData };
};

export default useGet;