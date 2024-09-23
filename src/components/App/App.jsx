import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const RegistrationPage = lazy(() =>
  import("../../pages/RegistrationPage/RegistrationPage")
);
const ContactsPage = lazy(() =>
  import("../../pages/ContactsPage/ContactsPage")
);

export default function App() {
  return (
    <div>
      <Layout>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </div>
  );
}

// import { lazy, Suspense } from "react";
// import { Route, Routes } from "react-router-dom";
// import Layout from "./Layout/Layout";

// const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
// const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage"));
// const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
// const TasksPage = lazy(() => import("../pages/TasksPage/TasksPage"));

// export default function App() {
//   return (
//     <Layout>
//       <Suspense fallback={null}>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/tasks" element={<TasksPage />} />
//         </Routes>
//       </Suspense>
//     </Layout>
//   );
// }
