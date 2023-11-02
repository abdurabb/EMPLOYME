

import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
// user side
import { Authorization } from './Authentication/User/UserAuthentication'
import { HomeVerification } from './Authentication/User/HomeAuthentication'
import LandPage from './pages/UserLandPage';
import Login from './pages/UserLogin';
import UserRegistration from './pages/UserRegistration';
import SetLogin from './pages/SetLogin';
import JobListin from './pages/JobListin';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile'
import PlanList from './pages/PlanList';
import JobApply from './pages/JobApply';
import ApplicationListing from './pages/ApplicationListing';
import Chat from './pages/Chat';
import Error from './pages/Error';
import ServerError from './pages/ServerError';

// admin side
import { AdminAuthorization } from './Authentication/Admin/AdminAuthentication'
import AdminLogin from './pages/AdminPages/AdminLogin';
import DashBoard from './pages/AdminPages/DashBoard';
import Category from './pages/AdminPages/Category';
import CreateCategory from './pages/AdminPages/CreateCategory';
import EditCategory from './pages/AdminPages/EditCategory';
import UserManagement from './pages/AdminPages/UserManagement';
import CompanyManagement from './pages/AdminPages/CompanyManagement';
import Premium from './pages/AdminPages/Premium';
import CreatePremium from './pages/AdminPages/CreatePremium';
import EditPremium from './pages/AdminPages/EditPremium';
import AdminProfile from './pages/AdminPages/AdminProfile';
import AdminJobListin from './pages/AdminPages/JobListing';
// company side
import { CompanyAuthorization } from './Authentication/Compeny/CompanyAuthentication'
// import {CompanyHomeVerification} from './Authentication/Compeny/HomeAuthentication'
import CompanyLogin from './pages/CompanyPages/CompanyLogin';
import CompanyRegistration from './pages/CompanyPages/CompanyRegistration';
import CompanyHome from './pages/CompanyPages/CompanyHome';
import JobPosting from './pages/CompanyPages/JobPosting';
import HireHIstory from './pages/CompanyPages/HireHIstory';
import EditJobs from './pages/CompanyPages/EditJobs';
import CompanyProfile from './pages/CompanyPages/CompanyProfile';
import EditCompanyProfile from './pages/CompanyPages/EditCompanyProfile';
import Candidates from './pages/CompanyPages/Candidates';
import CompanyChat from './pages/CompanyPages/CompanyChat';



function App() {
  
  return (
    <div className="App">
      < Toaster />
      <Router>
        <Routes>

          {/* User Side */}
          <Route path='/' element={<HomeVerification> <LandPage /></HomeVerification>} />
          <Route path='/login' element={<Authorization accessBy={'non-Authorized'}><Login /></Authorization>} />
          <Route path='/userRegistration' element={<Authorization accessBy={'non-Authorized'}> <UserRegistration /></Authorization>} />
          <Route path='/loginSet' element={<Authorization accessBy={'non-Authorized'}> <SetLogin /> </Authorization>} />
          <Route path='/jobListing' element={<HomeVerification> <JobListin /> </HomeVerification>} />
          <Route path='/profile' element={<Authorization accessBy={'Authorized'} > <Profile /> </Authorization>} />
          <Route path='/editProfile' element={<Authorization accessBy={'Authorized'} > <EditProfile /></Authorization>} />
          <Route path='/planList' element={<Authorization accessBy={'Authorized'} >  <PlanList /></Authorization>} />
          <Route path='/jobApply' element={<Authorization accessBy={'Authorized'} >  <JobApply /> </Authorization>} />
          <Route path='/application_listing' element={<Authorization accessBy={'Authorized'} >  <ApplicationListing /></Authorization>} />
          <Route path='/chat' element={<Authorization accessBy={'Authorized'} > <Chat /> </Authorization>} />
          <Route path='/error' element={<Error />} />
          <Route path='/error_server' element={<ServerError />} />


          {/* Admin Side */}
          <Route path='/admin' element={<AdminAuthorization accessBy={'non-Authorized'}><AdminLogin /></AdminAuthorization>} />
          <Route path='/dashboard' element={<DashBoard />} />
          <Route path='/category' element={<AdminAuthorization accessBy={'Authorized'}> <Category /> </AdminAuthorization>} />
          <Route path='/createCategory' element={<AdminAuthorization accessBy={'Authorized'}><CreateCategory /> </AdminAuthorization>} />
          <Route path='/editCategory' element={<AdminAuthorization accessBy={'Authorized'}> <EditCategory /> </AdminAuthorization>} />
          <Route path='/userManage' element={<AdminAuthorization accessBy={'Authorized'}><UserManagement /> </AdminAuthorization>} />
          <Route path='/companyManage' element={<AdminAuthorization accessBy={'Authorized'}><CompanyManagement /> </AdminAuthorization>} />
          <Route path='/premiumManage' element={<AdminAuthorization accessBy={'Authorized'}><Premium /> </AdminAuthorization>} />
          <Route path='/createPremium' element={<AdminAuthorization accessBy={'Authorized'}><CreatePremium /> </AdminAuthorization>} />
          <Route path='/editPremium' element={<AdminAuthorization accessBy={'Authorized'}><EditPremium /> </AdminAuthorization>} />
          <Route path='/admin_profile' element={<AdminAuthorization accessBy={'Authorized'}><AdminProfile /> </AdminAuthorization>} />
          <Route path='/job_list' element={<AdminAuthorization accessBy={'Authorized'}><AdminJobListin /> </AdminAuthorization>} />


          {/* Company Side */}
          <Route path='/companyLogin' element={<CompanyAuthorization accessBy={'non-Authorized'}><CompanyLogin /></CompanyAuthorization>} />
          <Route path='/companyRegistration' element={<CompanyAuthorization accessBy={'non-Authorized'}> <CompanyRegistration /> </CompanyAuthorization>} />
          <Route path='/companyHome' element={<CompanyHome />} />
          <Route path='/postJob' element={<CompanyAuthorization accessBy={'Authorized'}> <JobPosting /> </CompanyAuthorization>} />
          <Route path='/hire_history' element={<CompanyAuthorization accessBy={'Authorized'}> <HireHIstory /> </CompanyAuthorization>} />
          <Route path='/edit_jobs' element={<CompanyAuthorization accessBy={'Authorized'}> <EditJobs /> </CompanyAuthorization>} />
          <Route path='/company_profile' element={<CompanyAuthorization accessBy={'Authorized'}> <CompanyProfile /> </CompanyAuthorization>} />
          <Route path='/edit_company_profile' element={<CompanyAuthorization accessBy={'Authorized'}> <EditCompanyProfile />  </CompanyAuthorization>} />
          <Route path='/candidatesList' element={<CompanyAuthorization accessBy={'Authorized'}>   <Candidates /> </CompanyAuthorization>} />
          <Route path='/companyChat' element={<CompanyAuthorization accessBy={'Authorized'}> <CompanyChat /> </CompanyAuthorization>} />

          <Route path='/*' element={<Error />} />
        </Routes >
      </Router>


    </div>
  );
}

export default App;
