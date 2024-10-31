import { Outlet } from "react-router-dom";
import TopMenuBar from "./topMenu";

const AdminLayout = () => {
  return (
    <div>
      <TopMenuBar />
      <div className="pt-admin-wrapper">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
