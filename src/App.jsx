
import { lazy, Suspense } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
const LoginForm = lazy(() => import('./Pages/Auth/login/login'));

const RegisterForm = lazy(() => import('./Pages/Auth/register/registration'));




import Spinner from './components/spinner/spinner';
import ProductForm from './Pages/Cms/productCreate/productCreate';
import ProductList from './Pages/Cms/productlist/productList';
import ProductUpdate from './Pages/Cms/productUpdate/productUpdate';
import NoData from './components/noData/noData';
import ProductCreate from './Pages/Cms/productCreate/productCreate';
import ResponsiveAppBar from './Layout/header/header';



function App() {

  function PrivateRoute({ children }) {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    console.log("token12232323", token)
    return token !== null && token !== undefined ? (
      children
    ) : (
      <>
        <Navigate to="/" />
        {alert("You must login first to visit this page!")}
      </>
    );
  }



  const publicRoutes = [
    {
      path: "/",
      component: <LoginForm />
    },
    {
      path: "/auth/register",
      component: <RegisterForm />
    },
    {
      path: "*",
      component: <NoData />
    }

  ]


  const privateRoutes = [
    {
      path: "/cms/list",
      component: <ProductList />
    },
    {
      path: "/cms/create",
      component: <ProductCreate />
    },
    {
      path: "/cms/update/:id",
      component: <ProductUpdate />
    }

  ]
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Router>
          <ResponsiveAppBar />
          <Routes>
            {
              publicRoutes.map((item) => {
                return (
                  <Route path={item.path} element={item.component} />
                )
              })
            }

            {
              privateRoutes.map((item) => {
                return (
                  <Route path={item.path} element={<PrivateRoute>{item.component}</PrivateRoute>} />
                )
              })
            }
          </Routes>



        </Router>
      </Suspense>

    </>
  )
}

export default App


