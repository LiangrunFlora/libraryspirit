

import './PersonalInformation.scss'
const PersonalInformation: React.FC = () => {
    // 示例数据
    const data = {
      user_id: '123',
      user_account: 'example_account',
      user_name: 'John Doe',
      gender: 'Male',
      phone: '123-456-7890',
      email: 'john@example.com',
      profile: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    };
  
    return (
        <div className='box'> 
        <div className="personal-information">
        <h1>Personal Information</h1>
        <div className="information-item">
          <label>User ID:</label>
          <span>{data.user_id}</span>
        </div>
        <div className="information-item">
          <label>User Account:</label>
          <span>{data.user_account}</span>
        </div>
        <div className="information-item">
          <label>User Name:</label>
          <span>{data.user_name}</span>
        </div>
        <div className="information-item">
          <label>Gender:</label>
          <span>{data.gender}</span>
        </div>
        <div className="information-item">
          <label>Phone:</label>
          <span>{data.phone}</span>
        </div>
        <div className="information-item">
          <label>Email:</label>
          <span>{data.email}</span>
        </div>
        <div className="information-item">
          <label>Profile:</label>
          <span>{data.profile}</span>
        </div>
      </div>
      </div>
    );
  };
  
  export default PersonalInformation;