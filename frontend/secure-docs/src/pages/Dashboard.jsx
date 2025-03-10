import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";




function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser(); 

      if (error || !data.user) {
        navigate("/login"); // Redirect to login if not authenticated
      } else {
        setUser(data.user);
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          <p>User ID: {user.id}</p>
          <LogoutButton />
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
}

export default Dashboard;
