import { Button, TextField } from "@mui/material";

export default function Adduser({ handleChange, handleAdd }) {
  return (
    <div className="adduser">
      <TextField
        sx={{ width: "20rem", marginTop: "2rem", marginRight: "0.5rem" }}
        id="newuser"
        label="Add User"
        variant="outlined"
        onChange={handleChange}
      />
      <Button
        variant="contained"
        size="large"
        sx={{ marginTop: "2rem", height: "3.4rem" }}
        onClick={handleAdd}
      >
        +
      </Button>
    </div>
  );
}
