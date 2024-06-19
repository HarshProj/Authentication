import axios from 'axios';
import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

// axios.defaults.baseURL = "http://localhost:5000";

interface User {
  name: string;
}

interface DecodedToken {
  user?: User;
}

interface FetchState {
  isLoading: boolean;
  apiData: any;
  status: number | null;
  serverError: any;
}

export default function useFetch(query: string): [FetchState, React.Dispatch<React.SetStateAction<FetchState>>] {
  const [getData, setData] = useState<FetchState>({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: undefined,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));

        const token = localStorage.getItem("auth-token");
        let userName = '';
        if (token) {
          const decoded: DecodedToken = jwtDecode(token);
          userName = decoded.user?.name || '';
        }

        const endpoint = query === '' ? `/api/auth/getuser/${userName}` : `/api/auth${query}`;
        const response = await axios.get(endpoint);
        // console.log(response);
        if (response.status === 200) {
          setData({
            isLoading: false,
            apiData: response.data.data,
            status: response.status,
            serverError: undefined,
          });
        }
      } catch (error) {
        setData({
          isLoading: false,
          apiData: undefined,
          status: null,
          serverError: error,
        });
      }
    };

    fetchData();
  }, [query]);

  return [getData, setData];
}
