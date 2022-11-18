import React, { PureComponent } from "react";
import { Navigate, Navigation, Outlet, Route } from "react-router-dom";

const PrivateComponent = () => {
  const Auth = localStorage.getItem("token");
  return Auth ? <Outlet /> : <Navigate to="login" />;
};

export default PrivateComponent;

{
  /* 
// can use to protect the routes 
<BrowserRouter>
  <Routes>
    <Route element={<PrivateComponent />}>
      <Route path="/companies" element={<Companies />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Dashboard />} />
    </Route>
    <Route path="/login" exact element={<Auth />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
  <Footer />
</BrowserRouter>; */
}
