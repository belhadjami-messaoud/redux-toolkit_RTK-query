
import Navbar from '../../component/navbar/navbar'
import { Outlet, Link } from 'react-router-dom'
export default function Home() {
    const style = {

    }
    return (

        <>
            <Navbar />
            <div className="container" style={{ display: "flex", }}  >
                <aside style={{ width: "40%", height: "85vh", background: "#ccc" }}>
                    <div> <Link to="/dash/home" >home</Link> </div>
                    <div> <Link to="/dash/profile" >profile</Link> </div>
                    <div> <Link to="/dash/addProduct" >add product</Link> </div>
                </aside>
                <div className="dashbord" style={{ width: "60%", }}>
                    <Outlet />
                </div>
            </div>
        </>

    )
}
