import { BrowserRouter, Routes,Route} from 'react-router-dom';
import AdminLogin from './components/Admin/AdminLogin';
import UserHomePage from './pages/User/UserHomePage';
import UserSignupPage from './pages/user/userSignupPage';
import UserLoginPage from './pages/user/UserLoginPage';
import CreateClubPage from './pages/user/CreateClubPage';
import JoinClubPage from './pages/user/JoinClubPage';
import ProtectedRoute from './components/User/ProtectedRoute';
import ChangePasswordPage from './pages/user/ChangePasswordPage';
import SetnewPassPage from './pages/user/SetnewPassPage';
import AdminDashBordPage from './pages/admin/AdminDashBordPage';
import AdminUserManagePage from './pages/admin/AdminUserManagePage';
import UserProfilePage from './pages/user/UserProfilePage';
import ClubHomePage from './pages/Club/ClubHomePage';
import ClubManagePage from './pages/admin/ClubManagePage';
import AdminClubViewPage from './pages/admin/AdminClubViewPage';
import ClubPaymentPage from './pages/Club/ClubPaymentPage';
import FinancePage from './pages/Club/FinancePage';
import NotificationPage from './pages/Club/NotificationPage';
import MembersPage from './pages/Club/MembersPage';
import './App.css'
import ClubProfilePage from './pages/Club/ClubProfilePage';
import ClubSettingPage from './pages/Club/ClubSettingPage';
import AboutPage from './pages/user/AboutPage';
import NewsPage from './pages/Club/NewsPage';
import MeetingPage from './pages/Club/MeetingPage';
import BlackListedPage from './pages/admin/BlackListedPage';
import BannerPage from './pages/admin/BannerPage';
import Loader from './components/Loader/Loader';

function App() {
  
  return (
    <>
      <div>
          <BrowserRouter>
          <Routes>
           <Route path='/loader' element={<Loader/>}></Route>
            {/* ADMIN */}
          <Route path="/adminlogin" element={<AdminLogin/>}> </Route>
          <Route path="/admin"  element={<AdminDashBordPage/>}></Route>
          <Route path='/admin-usermanage' element={<AdminUserManagePage/>}></Route>
          <Route path='/club-manage' element={<ClubManagePage/>}></Route>
          <Route path='/club-details' element={<AdminClubViewPage/>}></Route>
          <Route path='/blacklisted' element={<BlackListedPage/>}></Route>
          <Route path='/banner' element={<BannerPage/>}></Route>
          {/* <Route path='/admin-dashboard' element={<AdminDashBordPage/>}></Route> */}


          {/* USER */}
          <Route path='/' element={<UserHomePage/>}></Route>
          <Route path='/signup' element={<UserSignupPage/>}></Route>
          <Route path='/login' element={<UserLoginPage/>}></Route>
          {/* <Route path='/sendmail' element={<EmailSendPage/>}></Route> */}
          <Route path='/about' element={<AboutPage/>}></Route>
          <Route path='/reset-password' element={<ProtectedRoute><ChangePasswordPage/></ProtectedRoute>}></Route>
          <Route path='/new-password' element={<ProtectedRoute><SetnewPassPage/></ProtectedRoute>}></Route>
          <Route path='/user-profileupdate' element={<ProtectedRoute><UserProfilePage/></ProtectedRoute>}></Route>
         

          <Route path='/createclub' element={<ProtectedRoute><CreateClubPage/></ProtectedRoute>}></Route>
          <Route path='/joinclub' element={<ProtectedRoute><JoinClubPage/></ProtectedRoute>}></Route>
          <Route path='/clubhome' element={<ProtectedRoute><ClubHomePage/></ProtectedRoute>}></Route>
          <Route path='/payment' element={<ProtectedRoute><ClubPaymentPage/></ProtectedRoute>}></Route>
          <Route path='/finance' element={<ProtectedRoute><FinancePage/></ProtectedRoute>}></Route>
          <Route path='/notification' element={<ProtectedRoute><NotificationPage/></ProtectedRoute>}></Route>
          <Route path='/members' element={<ProtectedRoute><MembersPage/></ProtectedRoute>}></Route>
          <Route path='/club-profile' element={<ProtectedRoute><ClubProfilePage/></ProtectedRoute>}></Route>
          <Route path='/club-setting' element={<ProtectedRoute><ClubSettingPage/></ProtectedRoute>}></Route>
          <Route path='/news' element={<ProtectedRoute><NewsPage/></ProtectedRoute>}></Route>
          <Route path='/meeting' element={<ProtectedRoute><MeetingPage/></ProtectedRoute>}></Route>


  
          </Routes>
          </BrowserRouter>
          
       </div>
    </>
  )
}

export default App
