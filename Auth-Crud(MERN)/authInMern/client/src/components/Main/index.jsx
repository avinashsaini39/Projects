

import Sidebar from '../Sidebar';
// import styles from './styles.module.css';

const Main = () => {

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
}


    return(
        <div className='flex'>
            <Sidebar />
          
       </div>
        /* <div className={styles.main_container}>
            
            <nav className={styles.navbar}>

                <h1>fakebook</h1>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Logout
                </button>
            </nav>
            <Sidebar/>
        </div> */
    )
};

export default Main;