import { useEffect } from 'react';
import supabase from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

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
