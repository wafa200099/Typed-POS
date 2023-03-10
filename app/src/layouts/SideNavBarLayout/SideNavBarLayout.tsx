import "react-toastify/dist/ReactToastify.css";
import "../SideNavBarLayout/SideNavBarLayout.css";
import { Link } from "react-router-dom";
function SideNavBarLayout() {
  return (
    
    <div>
    <body>
      <div className="icon-bar shadow-sm">
        <Link to="/home" className="navbar-brand mb-3">
          <i className="fa fa-home"></i>
        </Link>
        <Link to="/pos" className="navbar-brand mb-3">
          <i className="fa fa-shopping-cart"></i>
        </Link>
        <Link to="/productspage" className="navbar-brand mb-3">
          <i className="fa-solid fa-plus"></i>
        </Link>
        <Link to="/productcatagories" className="navbar-brand mb-3">
          <i className="fa fa-list-alt" aria-hidden="true"></i>
        </Link>
      </div>
    </body>
  </div>
  );
}

export default SideNavBarLayout;



 