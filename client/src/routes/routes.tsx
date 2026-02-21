// # <-- File chứa đoạn code createBrowserRouter của bạn
import { lazy, Suspense } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
// --- COMPONENTS & LAYOUTS ---
import MainLayout from '@/layouts/MainLayout'
import PublicLayout from '@/layouts/PublicLayout'
import ProjectLayout from '@/layouts/ProjectLayout'
// --- AUTH GUARDS ---
import ProtectedRoute from '@/components/Auth/ProtectedRoute'
import PublicRoute from '@/components/Auth/PublicRoute'

// lazy loading page
// 1. Public Pages (Nằm trong src/public)
const LandingPage = lazy(() => import('@/pages/public/LandingPage'))
const LoginPage = lazy(() => import('@/pages/public/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/public/RegisterPage'))

// 2. Dashboard Pages (Nằm trong src/pages/dashboard)
const Homepage = lazy(() => import('@/pages/dashboard/Homepage'))
const Report = lazy(() => import('@/pages/dashboard/Report'))
const Support = lazy(() => import('@/pages/dashboard/Support'))

// 3. Project Pages (Nằm trong src/pages/projects)
const ProjectLists = lazy(() => import('@/pages/projects/ProjectLists'))
const ProjectDetail = lazy(() => import('@/pages/projects/ProjectDetail'))

// 4. Project Steps (Nằm trong src/pages/projects/steps)
const Info = lazy(() => import('@/pages/projects/steps/Info'))
const Pestel = lazy(() => import('@/pages/projects/steps/Pestel'))
const Target = lazy(() => import('@/pages/projects/steps/Target'))
const Evaluation = lazy(() => import('@/pages/projects/steps/Evaluation'))
const Solution = lazy(() => import('@/pages/projects/steps/Solution'))

// 5. Not Found, Errorr
const NotFound = lazy(() => import('@/pages/notFound/NotFound'))

// UI
import { Loading } from '@/components/ui'

export const router = createBrowserRouter(
  createRoutesFromElements(  
    <>
      {/* =================================================================
          PUBLIC (Chưa đăng nhập)
      ================================================================== */}
      <Route element={<PublicRoute />}>
        <Route path='/' element={<PublicLayout />}>
          <Route index element={
            <Suspense fallback={<Loading />}><LandingPage /></Suspense>
          } />
        </Route>
          <Route path='/login' element={
            <Suspense fallback={<Loading />}><LoginPage /></Suspense>
          } />
          <Route path='/register' element={
            <Suspense fallback={<Loading />}><RegisterPage /></Suspense>
          } />
      </Route>

      {/* =================================================================
          PRIVATE (Đã đăng nhập)
          Folder: src/pages/dashboard & src/pages/projects
      ================================================================== */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          
          {/* Dashboard */}
          <Route path='home' element={
            <Suspense fallback={<Loading />}><Homepage /></Suspense>
          } />
          <Route path='reports' element={
            <Suspense fallback={<Loading />}><Report /></Suspense>
          } />
          <Route path='support' element={
            <Suspense fallback={<Loading />}><Support /></Suspense>
          } />

          {/* --- QUẢN LÝ DỰ ÁN --- */}
          <Route path='projects' element={<ProjectLayout />}>
            {/* Danh sách dự án */}
            <Route index element={
              <Suspense fallback={<Loading />}><ProjectLists /></Suspense>
            } />
            
            {/* Các bước thực hiện (Steps) */}
            <Route path='info' element={
              <Suspense fallback={<Loading />}><Info /></Suspense>
            } />
            <Route path='pestel' element={
              <Suspense fallback={<Loading />}><Pestel /></Suspense>
            } />
            <Route path='target' element={
              <Suspense fallback={<Loading />}><Target /></Suspense>
            } />
            {/* <Route path='identify' element={<Identify />} /> */}
            <Route path='evaluation' element={
              <Suspense fallback={<Loading />}><Evaluation /></Suspense>
            } />
            <Route path='solution' element={
              <Suspense fallback={<Loading />}><Solution /></Suspense>
            } />
            <Route path='detail' element={
              <Suspense fallback={<Loading/>}><ProjectDetail /></Suspense>
            } />
          </Route>

        </Route>
      </Route>

      {/* Route 404 (Nếu bạn chưa tạo file 404 thì dùng tạm div này) */}
      <Route path='*' element={<Suspense fallback={<Loading />}><NotFound /></Suspense>} />
    </>
  )
)
