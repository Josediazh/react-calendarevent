import { useDispatch, useSelector } from 'react-redux'
import calendarApi from '../api/calendarApi';
import { checking, clearMessage, login, logout } from '../store/auth/authSlice';
import { onEndtFetch, onStartFetch } from '../store/ui/uiSlice';
import { clearEvents } from '../store/calendar/calendarSlice';

export const useAuthStore = () => {

    const {status,user,errorMessage} = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async({correo,password}) => {

        dispatch(checking());
        dispatch(onStartFetch());

        try{

            const resp = await calendarApi.post('/auth',{
                email: correo,
                password
            }); 

            const {uid,name,token} = resp.data;

            localStorage.setItem('token',token);
            localStorage.setItem('token.init-date', new Date().getTime());

            dispatch(login({uid,name}));

        }catch(error){
            
            dispatch(logout(error.response.data?.msg || 'Ocurrio un error inesperado'));
            setTimeout( () => {
                dispatch(clearMessage());
            },100 )
        }

        dispatch(onEndtFetch());
    }

    const startRegisterUser = async({nameuser,correouser,passworduser}) => {

        dispatch(checking());
        dispatch(onStartFetch());

        try{

            const resp = await calendarApi.post('/auth/new',{
                name: nameuser,
                email: correouser,
                password:passworduser
            }); 

            const {uid,name,token} = resp.data;

            localStorage.setItem('token',token);
            localStorage.setItem('token.init-date', new Date().getTime());

            dispatch(login({uid,name}));

        }catch(error){
            
            dispatch(logout(error.response.data?.msg || 'Ocurrio un error inesperado'));
            setTimeout( () => {
                dispatch(clearMessage());
            },100 )
        }

        dispatch(onEndtFetch());
    }

    const checkAuthToken = async() => {

        dispatch(checking());

        const token = localStorage.getItem('token');

        if(!token){

            dispatch(logout());

            return;
        }

        try{

            const resp = await calendarApi.get('auth/renew');

            const {uid,name,token} = resp.data;

            localStorage.setItem('token',token);
            localStorage.setItem('token.init-date', new Date().getTime());
            dispatch(login({uid,name}));
            
    
        }catch(error){

            dispatch(logout()); 
            localStorage.clear();

        }

    }

    const startLogout = () => {

        localStorage.clear();
        dispatch( logout() );
        dispatch ( clearEvents() );

    }

    return {
        status,
        user,
        errorMessage,
        startLogin,
        startRegisterUser,
        checkAuthToken,
        startLogout
    }
  
}