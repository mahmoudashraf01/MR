import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useAuthRedirect = () => {
    const { token } = useSelector((state) => state.saveToken);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);
};

export default useAuthRedirect;
