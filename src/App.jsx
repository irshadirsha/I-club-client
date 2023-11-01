import { BrowserRouter, Routes,Route} from 'react-router-dom';
import AdminLogin from './components/Admin/AdminLogin';
import UserHomePage from './pages/user/userHomePage';
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
import ClubProfilePage from './pages/Club/ClubProfilePage';
import ClubSettingPage from './pages/Club/ClubSettingPage';
import AboutPage from './pages/user/AboutPage';
import NewsPage from './pages/Club/NewsPage';
import MeetingPage from './pages/Club/MeetingPage';
import BlackListedPage from './pages/admin/BlackListedPage';
import BannerPage from './pages/admin/BannerPage';
import Loader from './components/Loader/Loader';
import AdminProtectedRoute from './components/Admin/AdminProtectedRoute';
import PageNot from './components/PageNot';
import './App.css'
import ClubViewPage from './pages/user/ClubViewPage';
function App() {
  
  return (
    <>
      <div>
          <BrowserRouter>
          <Routes>
           <Route path='/loader' element={<Loader/>}></Route>
            {/* ADMIN */}
          <Route path="/adminlogin" element={<AdminLogin/>}> </Route>
          <Route path="/admin"  element={<AdminProtectedRoute><AdminDashBordPage/></AdminProtectedRoute>}></Route>
          <Route path='/admin-usermanage' element={<AdminProtectedRoute><AdminUserManagePage/></AdminProtectedRoute>}></Route>
          <Route path='/club-manage' element={<AdminProtectedRoute><ClubManagePage/></AdminProtectedRoute>}></Route>
          <Route path='/club-details' element={<AdminProtectedRoute><AdminClubViewPage/></AdminProtectedRoute>}></Route>
          <Route path='/blacklisted' element={<AdminProtectedRoute><BlackListedPage/></AdminProtectedRoute>}></Route>
          <Route path='/banner' element={<AdminProtectedRoute><BannerPage/></AdminProtectedRoute>}></Route>
          {/* <Route path='/admin-dashboard' element={<AdminDashBordPage/>}></Route> */}


          {/* USER */}
          <Route path='/' element={<UserHomePage/>}></Route>
          <Route path='/signup' element={<UserSignupPage/>}></Route>
          <Route path='/login' element={<UserLoginPage/>}></Route>
          <Route path='/club-list' element={<ClubViewPage/>}></Route>
          {/* <Route path='/sendmail' element={<EmailSendPage/>}></Route> */}
          <Route path='/about' element={<AboutPage/>}></Route>
          <Route path='/reset-password' element={<ChangePasswordPage/>}></Route>
          <Route path='/new-password' element={<SetnewPassPage/>}></Route>
          <Route path='/user-profile' element={<ProtectedRoute><UserProfilePage/></ProtectedRoute>}></Route>
         

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


         <Route path='*' element={<PageNot/>}></Route>
         {/* <Route path='/admin*' element={<PageNot/>}></Route> */}
          </Routes>
          </BrowserRouter>
          
       </div>
    </>
  )
}

export default App
