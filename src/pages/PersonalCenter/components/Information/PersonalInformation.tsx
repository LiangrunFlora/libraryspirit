

import { useEffect, useState } from 'react';
import './PersonalInformation.scss'
import { getUserInfoFromSession } from '../../../../util/userInfo';
import { useNavigate } from 'react-router';
import { message } from 'antd';
const PersonalInformation: React.FC = () => {

  const navigate = useNavigate()
    // 示例数据
    // const data:User = {
    //   user_id: 123,
    //   user_account: 'example_account',
    //   user_name: 'John Doe',
    //   gender: 'Male',
    //   phone: '123-456-7890',
    //   email: 'john@example.com',
    //   profile: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    // };

    const [userData,setUserData] = useState<User|null>()

    useEffect(() => {
      // 检查是否存在 token
      const token = getUserInfoFromSession();
      console.log(token)
      if (token) {
          setUserData(token);
      }
      else {
        message.error("登录失效,即将跳转")
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      }
    }, []); 
  
    return (
        <div className='box'> 
        <div className="personal-information">
        <h1>Personal Information</h1>
        <div className="information-item">
          <label>User ID:</label>
          <span>{userData?.user_id}</span>
        </div>
        <div className="information-item">
          <label>User Account:</label>
          <span>{userData?.user_account}</span>
        </div>
        <div className="information-item">
          <label>User Name:</label>
          <span>{userData?.user_name}</span>
        </div>
        <div className="information-item">
          <label>Gender:</label>
          <span>{userData?.gender}</span>
        </div>
        <div className="information-item">
          <label>Phone:</label>
          <span>{userData?.phone}</span>
        </div>
        <div className="information-item">
          <label>Email:</label>
          <span>{userData?.email}</span>
        </div>
        <div className="information-item">
          <label>Profile:</label>
          <span>{userData?.profile}</span>
        </div>
      </div>
      </div>
    );
  };
  
  export default PersonalInformation;