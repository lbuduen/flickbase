import { AdminTitle } from '../../../utils/tools';
import UserCredentials from './userCredentials';
import UserProfile from './userProfile'

const AdminProfile = () => {
  return (
    <>
      <AdminTitle title="Profile" />
      <UserCredentials />
      <UserProfile />
    </>
  )
}

export default AdminProfile;