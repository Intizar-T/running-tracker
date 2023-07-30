import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useState } from "react";
import type { User } from "./App";

interface LoginProps {
  showLoginModal: (show: boolean) => void;
  setUser: (user: User | undefined) => void;
}

const allowedUsers = ["Intizar", "Ovadan", "Jennet", "Hudayar"];

export default function Login({ showLoginModal, setUser }: LoginProps) {
  const [name, setName] = useState("");
  const [notAllowedUser, setNotAllowedUser] = useState(false);
  return (
    <Dialog
      open={true}
      keepMounted
      onClose={() => {}}
      aria-describedby="alert-dialog-slide-description"
      sx={{}}
    >
      <DialogTitle>{"One time registration:"}</DialogTitle>
      <DialogContent
        sx={{
          minWidth: "350px",
        }}
      >
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          container
          spacing={1}
        >
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              label="Your name:"
              focused
              onChange={(e) => {
                if (notAllowedUser) setNotAllowedUser(false);
                setName(e.target.value);
              }}
              sx={{
                marginTop: 2,
                marginBottom: notAllowedUser ? 0 : 2,
                width: "100%",
              }}
              fullWidth
            />
            {notAllowedUser && (
              <p style={{ color: "red" }}>
                Sorry, you are not allowed to register
              </p>
            )}
          </Grid>
          <Grid container>
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
              xs={6}
            >
              <Button
                variant="contained"
                sx={{
                  width: 20,
                  height: 40,
                  paddingX: 5,
                }}
                onClick={async () => {
                  showLoginModal(false);
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
              xs={6}
            >
              <Button
                variant="contained"
                sx={{
                  width: 20,
                  height: 40,
                }}
                onClick={async () => {
                  if (name === "" || !allowedUsers.includes(name)) {
                    setNotAllowedUser(true);
                    return;
                  }
                  localStorage.setItem("user", name);
                  setUser({ name });
                  showLoginModal(false);
                }}
              >
                OK
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
