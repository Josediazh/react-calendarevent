import './assets/loginstyle.css'
import { useForm } from '../../../hook/useForm'
import { useAuthStore } from '../../../hook/useAuthStore'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'

  const initLoginForm = {
    correo: '',
    password: '',
  }

  const initRegisterForm = {
    nameuser: '',
    correouser: '',
    passworduser: '',
    passwordto: '',
  }

export const LoginPage = () => {

  const { startLogin,startRegisterUser,errorMessage } = useAuthStore(); 

  const {formState: formLoginState,correo,password,onInputChange: onLoginInputChange} = useForm(initLoginForm);  
  
  const {formState: formRegisterState,nameuser,correouser,passworduser,passwordto,onInputChange: onRegisterInputChange} = useForm(initRegisterForm);

  const { isfetch } = useSelector( state => state.ui );
  

  const onFormLoginSubtmit = (event) => {
    event.preventDefault();

    startLogin({correo,password});
  }

  const onFormRegisterSubtmit = (event) => {
    event.preventDefault();

    if (passworduser != passwordto){

        Swal.fire({
            title: "Error",
            text: "Las contraseñas no coinciden",
            icon: "error"
          });
    
        return;
    }

    startRegisterUser({nameuser,correouser,passworduser});
  } 

  useEffect(() => {

    if (errorMessage != null){

    Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error"
      });
    }

  }, [errorMessage])
  

  return (
    <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={onFormLoginSubtmit} className='loginform'>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='correo'
                                onChange={onLoginInputChange}
                                value={correo}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='password'
                                onChange={onLoginInputChange}
                                value={password}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                                disabled={
                                    isfetch 
                                    ? true
                                    : false
                                }
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={onFormRegisterSubtmit} className='registerform'>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='nameuser'
                                onChange={onRegisterInputChange}
                                value={nameuser}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='correouser'
                                onChange={onRegisterInputChange}
                                value={correouser}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name='passworduser'
                                onChange={onRegisterInputChange}
                                value={passworduser}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name='passwordto'
                                onChange={onRegisterInputChange}
                                value={passwordto}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" 
                                disabled={
                                    isfetch 
                                    ? true
                                    : false
                                }
                                />
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}
