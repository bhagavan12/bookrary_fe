import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import UpdatePassword from './UpdatePass';
import UploadProfileImage from './UploadProfileImage';
import '../Styling/Profile.css';
import { Card } from 'primereact/card';
import { TabView, TabPanel } from 'primereact/tabview';
import { Image } from 'primereact/image';
import ReadingHistory from './ReadingHistory';
const Profile = () => {
    const { user } = useSelector((state) => state.user); // Get username, email from Redux store
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordUpdateMessage, setPasswordUpdateMessage] = useState('');
    return (
        <>
            {/* <div className="profile-page">
      <h1>Profile</h1>
      
      <div className="profile-details">
        <h2>Username: {user.username}</h2>
        <h3>Email: {user.email}</h3>
      </div>

     <UploadProfileImage readerId={user.id}/>
    <UpdatePassword readerId={user.id}/>
    </div> */}
            <div className='profilecontainer'>
                <Card title={user.username}>
                    <div className='cardcontainer'>
                        <img src='https://library.sportingnews.com/styles/crop_style_16_9_desktop/s3/2023-12/Virat%20Kohli%20Test.jpg?h=920929c4&itok=SooosmZU' className='profileimage' preview></img>
                        <div className='tab-container'>
                            <TabView>
                                <TabPanel header="Reading History">
                                    <TabView >
                                        <TabPanel header="In Progess" className=''>
                                            <div className="custom-carousel"> 
                                                <ReadingHistory status={"current"} />
                                            </div>
                                        </TabPanel>
                                        <TabPanel header="Completed">
                                            <div className="custom-carousel"> 
                                                <ReadingHistory status={"completed"} />
                                            </div>

                                        </TabPanel>
                                    </TabView>
                                </TabPanel>
                                <TabPanel header="Reviews">

                                </TabPanel>
                                <TabPanel header="Update Profile">
                                    <UploadProfileImage readerId={user.id} />
                                    <UpdatePassword readerId={user.id} />
                                </TabPanel>
                            </TabView>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default Profile;
