
import { lazy, Suspense } from 'react'
import './App.css'

const LoginForm = lazy(() => import('./Pages/Auth/login/login'));

const RegisterForm = lazy(() => import('./Pages/Auth/register/registration'));

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import Spinner from './components/spinner/spinner';
import ProductForm from './Pages/Cms/productCreate/productCreate';
import ProductList from './Pages/Cms/productlist/productList';
import ProductUpdate from './Pages/Cms/productUpdate/productUpdate';

function App() {
  return (
    <>
      
      <Router>
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/auth/register" element={<RegisterForm />} />
      <Route path="/cms/product-form" element={<ProductForm />} /> {/* New Route */}
     <Route path="/cms/list" element={<ProductList />} /> 
     <Route path="/cms/update/:id" element={<ProductUpdate/>}/>
     
    </Routes>
  </Router>
      

    </>
  )
}


export default App


// function App() {

//   function PrivateRoute({ children }) {
//     const token = localStorage.getItem("token") || sessionStorage.getItem("token");
//     console.log("token12232323", token)
//     return token !== null && token !== undefined ? (
//       children
//     ) : (
//       <>
//         <Navigate to="/" />
//         {alert("You must login first to visit this page!")}
//       </>
//     );
//   }



//   const publicRoutes = [
//     {
//       path: "/",
//       component: <LoginForm />
//     },
//     {
//       path: "/auth/register",
//       component: <RegisterForm />
//     },
//     {
//       path: "*",
//       component: <NoData />
//     }

//   ]


//   const privateRoutes = [
//     {
//       path: "/cms/list",
//       component: <ProductList />
//     },
//     {
//       path: "/cms/create",
//       component: <ProductCreate />
//     },
//     {
//       path: "/cms/update/:id",
//       component: <ProductUpdate />
//     }

//   ]
//   return (
//     <>
//       <Suspense fallback={<Spinner />}>
//         <Router>
//           <Wrapper>
//             <Routes>
//               {
//                 publicRoutes.map((item) => {
//                   return (
//                     <Route path={item.path} element={item.component} />
//                   )
//                 })
//               }

//               {
//                 privateRoutes.map((item) => {
//                   return (
//                     <Route path={item.path} element={<PrivateRoute>{item.component}</PrivateRoute>} />
//                   )
//                 })
//               }
//             </Routes>
//           </Wrapper>


//         </Router>
//       </Suspense>

//     </>
//   )
// }

// export default App


