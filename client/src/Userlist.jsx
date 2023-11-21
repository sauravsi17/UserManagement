import { Button, Typography, colors } from "@mui/material";

export default function Userlist({ userName, handleRemove, setUserlist }) {
  function handleRemove(key) {
    setUserlist((el) => {
      return el.filter((member) => member !== key);
    });

    async function deleteData() {
      try {
        const response = await fetch("http://localhost:3001/deleteUser", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: key,
          }),
        });

        const data = await response.json();
        console.log("Success:", data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    deleteData();
  }

  return (
    <div className="userdetails">
      <Typography
        variant="caption"
        sx={{ fontSize: "1.25rem", color: "green" }}
      >
        {userName}
      </Typography>

      <Button
        variant="contained"
        size="small"
        key={userName}
        onClick={() => handleRemove(userName)}
      >
        -
      </Button>
    </div>
  );
}
