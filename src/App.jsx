import { useEffect, useState } from 'react'
import { createBrowserRouter, data, RouterProvider, useNavigate } from 'react-router-dom'
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import ForgetPassword from './pages/ForgetPassword.jsx';
import Dashboard from './pages/dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Loader from "./components/Loader.jsx"
import EmailVerification from './pages/EmailVerification.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from './features/authSlice.js';
import VitalsForm from './pages/VitalsForm.jsx';
import { useGetUserQuery } from './services/auth.js';
import HealthTimeline from './pages/HealthTimeline.jsx';
import DocumentUploadPage from './pages/DocumentUploadPage.jsx';
import DocumentsPage from './pages/DocumentsPage.jsx';
import AiReportPage from './pages/AiReportPage.jsx';
import ConfirmationModal from './components/ConfirmationOfDocUpload.jsx';

function App() {

  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();


  const { isFetching, data, isError, error } = useGetUserQuery();

  if (isError) {
    console.log(error)
  }

  if (data?.isLogin) {
    dispatch(setLogin(data.user))
  };

  // useEffect(() => {
  //   if (!data) return;
  //   console.log(isFetching)
  // }, [data])


  // async function getUser() {
  //   try {
  //     let res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/getUser`, {
  //       credentials: 'include'
  //     });
  //     let data = await res.json();
  //     if (!data.isLogin) {
  //       return;
  //     };
  //   } catch (error) {
  //     alert(error.message)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   getUser()
  // }, []);
  

  if (isFetching) {
    return <Loader />
  }


  const router = createBrowserRouter([
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/forget-password',
      element: <ForgetPassword />
    },
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      )
    },
    {
      path: '/verify-email',
      element: <EmailVerification />
    },
    {
      path: '/add-vitals',
      element: (
        <ProtectedRoute>
          <VitalsForm />
        </ProtectedRoute>
      )
    },
    {
      path: '/health-timeline',
      element: (
        <ProtectedRoute>
          <HealthTimeline/>
        </ProtectedRoute>
      )
    },
    {
      path: '/upload',
      element: (
        <ProtectedRoute>
          <DocumentUploadPage/>
        </ProtectedRoute>
      )
    },
    {
      path: '/reports',
      element: (
        <ProtectedRoute>
          <DocumentsPage/>
        </ProtectedRoute>
      ),
    },
    {
      path: '/ai/report/:id',
      element:(
        <ProtectedRoute>
          <AiReportPage/>
        </ProtectedRoute>
      )
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
