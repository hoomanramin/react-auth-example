import {useContext} from "react";
import {Routes, Route, Navigate} from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./store/auth-context";

function App() {
  const authCTX = useContext(AuthContext);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {!authCTX.isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
        {authCTX.isLoggedIn && (
          <Route path="/profile" element={<UserProfile />} />
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;
