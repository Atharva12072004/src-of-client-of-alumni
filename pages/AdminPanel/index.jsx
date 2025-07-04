import {
  Briefcase,
  Newspaper,
  Users,
  LogOut,
  UserRoundCheck,
  ImagePlus,
} from "lucide-react";

import Sidebar, { SidebarItem } from "../../components/AdminPanel/Sidebar";
import { useState } from "react";
import Verifications from "./Verifications";
import NewsHandle from "./NewsHandle";
import JobsHandle from "./JobsHandle";
import UserHandle from "./UserHandle";
import { ToastContainer } from "react-toastify";
import AdminLogin from "./AdminLogin";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom } from "../../store/atoms/User";

function AdminPanel() {
  const [activeItem, setActiveItem] = useState(1);

  const user = useRecoilValue(userAtom);
  const setUser = useSetRecoilState(userAtom);

  const handleSidebarClick = (id) => {
    setActiveItem(id);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser((prev) => ({
      ...prev,
      basic: {
        name: "",
        email: "",
        rank: -1,
        isLoggedIn: false,
      },
      profilePic: "",
      socials: {
        githubUrl: "",
        linkedInUrl: "",
        xUrl: "",
      },
      notifications: [],
      address: {
        city: "",
        state: "",
      },
      activity: {
        projectsFloated: 0,
        jobsFloated: 0,
        internshipsFloated: 0,
      },
      collegeDetails: {
        branch: "",
        batch: "",
      },
      jobRelated: {
        company: "",
        jobTitle: "",
      },
    }));
  };

  return (
    <>
      {!user?.basic?.isLoggedIn || user?.basic?.rank !== 0 ? (
        <AdminLogin />
      ) : (
        <div className="flex">
          <Sidebar user={user}>
            <SidebarItem
              id={1}
              icon={<UserRoundCheck size={20} />}
              text="Verification"
              active={activeItem === 1}
              onClick={() => handleSidebarClick(1)}
            />
            <SidebarItem
              id={2}
              icon={<Briefcase size={20} />}
              text="Jobs"
              active={activeItem === 2}
              onClick={() => handleSidebarClick(2)}
            />
            <SidebarItem
              id={3}
              icon={<Newspaper size={20} />}
              text="News"
              active={activeItem === 3}
              onClick={() => handleSidebarClick(3)}
            />
            <SidebarItem
              id={4}
              icon={<Users size={20} />}
              text="Users"
              active={activeItem === 4}
              onClick={() => handleSidebarClick(4)}
            />
            <SidebarItem
              id={6}
              icon={<LogOut size={20} />}
              text="Logout"
              active={activeItem === 6}
              onClick={handleLogout}
            />
          </Sidebar>

          {/* Render sections */}
          {activeItem === 1 && <Verifications />}
          {activeItem === 2 && <JobsHandle />}
          {activeItem === 3 && <NewsHandle />}
          {activeItem === 4 && <UserHandle />}
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
}

export default AdminPanel;
