import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import { UserApi } from '../../Api/UserApi'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function ProfileList() {
  const navigate = useNavigate()
  const [user, setUser] = useState()
  const [userId, setUserId] = useState()


  useEffect(() => {
    let token = localStorage.getItem('UserToken')
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.id) {
        const id = decodedToken.id
        UserApi.get(`/profileData?id=${id}`).then((res) => {
          setUser(res.data.data)
          setUserId(res.data.data._id)

        }).catch((err) => {
          console.log(err);
          navigate('/error_server')
        })
      }
    }
  }, [])

  useEffect(() => {
    const getQueryParams = () => {
      const queryParams = new URLSearchParams(window.location.search);
      return {
        session_id: queryParams.get('session_id'),
        planId: queryParams.get('planId'),
        jobId: queryParams.get('jobId'),
      };
    };

    // Get the session ID from the URL
    const sessionData = getQueryParams();

    const sessionId = sessionData.session_id;
    const planId = sessionData.planId

    if (sessionId) {

      console.log(user);
      UserApi.patch('/confirmation', { sessionId, userId, planId }).then((res) => {
        toast.success(res.data.messege, {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#00FF00',
            color: '#333',
          }
        })
      }).catch((err) => {
        console.log(err);

      })
    } else {
      console.log('NO Session Id');
    }
  }, [userId])


  let dateString = ''
  if (user) {
    console.log(user.planEndingDate);
    console.log(new Date() + '   ' + 'date now');
    const date = new Date(user.planEndingDate);
    dateString = date.toLocaleDateString('en-US')
  }

  const handleReniew = () => {
    navigate('/planList')
  }

  return (
    <div>
      <div className="bg-gray-100 min-h-screen p-8">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
          <div className="bg-blue-500 text-white text-center py-4">
            <h1 className="text-2xl font-semibold">Your  Profile</h1>
          </div>

          <div className="px-6 py-4">
            {user ?
              <img
                src={user ? user.Image : ''}
                alt="User Avatar"
                className="w-32 h-32 rounded-full mx-auto"
              />
              :
              <img
                src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
                alt="User Avatar"
                className="w-32 h-32 rounded-full mx-auto"
              />
            }

            <h2 className="mt-4 text-xl font-semibold text-gray-800 text-center">{user ? user.first_name + " " + user.last_name : ''}</h2>
            <h3 className="text-gray-600 font-bold text-center">{user ? user.post : ''}</h3>
            <div className="mt-6">
              <p className="text-gray-700 font-bold">Email: {user ? user.email : ''}</p>
              <p className="text-gray-700 font-bold">Phone: {user ? user.mobile : ''}</p>
              <p className="text-gray-700 font-bold">Gender: {user ? user.gender : ''}</p>
              <p className="text-gray-700 font-bold">Qualification: {user ? user.qualification : ''}</p>
              <div className='flex justify-between'>
                <p className="text-gray-700 font-bold">Plan Expire :{'  ' + dateString}</p>
                {
                  new Date() <= Date.now() ? '' :
                    <button className='bg-blue-500 p-2 rounded-xl text-white'
                      onClick={handleReniew}>Reniew Your Plan</button>}
              </div>


              <div>

                <h3 className='mt-4 flex justify-center'>Address</h3>
                <div className='flex justify-between '>
                  <p className="  text-gray-700 font-bold">Location: {user ? user.address : ''}</p>
                  <p className="  text-gray-700 font-bold">District: {user ? user.district : ''}</p>
                </div>
                <div className='flex justify-between '>
                  <p className="  text-gray-700 font-bold">State: {user ? user.state : ''}</p>
                  <p className="  text-gray-700 font-bold">Country: {user ? user.country : ''}</p>
                </div>
                <p className="text-gray-700 font-bold">ZipCode: {user ? user.zipCode : ''}</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-500 text-white text-center py-3">
            <button className='bg-blue-500 hover:bg-blue-800 rounded-xl font-semibold p-3'
              onClick={() => {
                const encodedUserData = encodeURIComponent(JSON.stringify(user._id));
                navigate(`/editProfile?data=${encodedUserData}`);
              }}>Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileList
