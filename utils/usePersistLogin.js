import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '../store/atoms/User';
import {fetcherGet} from "./axiosAPI";

const usePersistLogin = () => {
  const setUser = useSetRecoilState(userAtom);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUserDetails = async () => {
        try {
          const response = await fetcherGet('user/get');

          if (response.status) {
            setUser((prevData) => ({
              ...prevData,
              basic: {
                ...prevData.basic,
                isLoggedIn: true,
                email: response.user.email,
                rank: response.user.rank,
                id: response.user.userID,
                name: response.user.name
              },
              profilePic: response.user.profilePicURL,
              socials: {
                githubUrl: response.user.githubURL,
                linkedInUrl: response.user.linkedinURL,
                xUrl: response.user.xURL
              },
              notifications: response.user.notifications,
              collegeDetails: {
                branch: response.user.branch,
                batch: response.user.batch
              },
              jobRelated: {
                company: response.user.companyName,
                jobTitle: response.user.position,
              }
            }));
          }
        } catch (error) {
          console.log('Error fetching user details:', error);
          localStorage.removeItem('token');
          // Optionally redirect to login page
          // window.location = '/login';
        }
      };

      fetchUserDetails();
    }
  }, [setUser]);
};

export default usePersistLogin;