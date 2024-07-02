import { useEffect } from 'react';
import supabase from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook to check user authentication status and redirect if not authenticated.
 */
const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate('/');
      }
    };
    checkUser();
  }, [navigate]);
};

export default useAuthCheck;
