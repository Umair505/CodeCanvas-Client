import axios from 'axios';
import useAuth from './useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import ErrorPage from '../pages/ErrorPage';

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (!error.response) {
          // Network error or no response
          toast.error('Network error. Please check your connection.');
          return Promise.reject(error);
        }

        console.log('Error caught from axios interceptor:', error.response);
        
        switch (error.response.status) {
          case 401:
            // Unauthorized - logout and redirect to login
            await logOut();
            toast.error('Session expired. Please login again.');
            navigate('/login');
            break;
            
          case 403:
            // Forbidden - show message and redirect to dashboard
            toast.error('You do not have permission to perform this action.');
            navigate('/dashboard');  
            break;
            
          case 404:
            // Not found
            toast.error('The requested resource was not found.');
            return <ErrorPage/>;
            
          case 500:
            // Server error
            toast.error('Server error. Please try again later.');
            break;
            
          
        }
        
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate]);
  
  return axiosSecure;
};

export default useAxiosSecure;