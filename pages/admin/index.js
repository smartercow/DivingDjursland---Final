import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Dashboard from "../../components/Admin/Dashboard";
import { auth } from "../../components/Firebase/clientApp";
import { useRouter } from "next/router";

const Admin = () => {
  const [user] = useAuthState(auth);
  const router = useRouter()

  if (router.pathname.startsWith('/admin')) {
      router.push('/admin/dashboard')
  }

  if (user) {
    router.push('/auth')
  }
  return (
    <div>
      {user ? (
        <div>
          <Dashboard />
        </div>
      ) : (
        <div>
          <h1>Side kun for admins!</h1>
        </div>
      )}
    </div>
  );
};

export default Admin;
