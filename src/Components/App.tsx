import { Box } from "@mui/material";
import Calendar from "./Calendar";
import { useEffect, useState } from "react";
import { events } from "../data/events";
import Login from "./Login";

export type User = {
  name: string;
};

function App() {
  const [user, setUser] = useState<User>();
  const [loginModal, showLoginModal] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("schedule") == null) {
      localStorage.setItem("schedule", JSON.stringify(events));
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("user") == null) return;
    else setUser({ name: localStorage.getItem("user") as string });
  }, []);
  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <Calendar showLoginModal={showLoginModal} user={user} />
      {loginModal && (
        <Login showLoginModal={showLoginModal} setUser={setUser} />
      )}
    </Box>
  );
}

export default App;
