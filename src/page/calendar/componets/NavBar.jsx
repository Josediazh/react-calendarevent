import { useAuthStore } from "../../../hook/useAuthStore"

export const NavBar = () => {

  const { startLogout,user } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">
            <i className="bi bi-person-fill"></i>
            &nbsp;
            {user?.name}
        </span>
        <button onClick={ startLogout } className="btn btn-outline-danger">
            <i className="bi bi-box-arrow-right"></i>
            &nbsp;
            <span>Salir</span>
        </button>
    </div>
  )
}