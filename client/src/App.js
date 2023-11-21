import { useEffect, useState } from "react";
import Adduser from "./Adduser";
import "./App.css";
import ButtonAppBar from "./Appbar";
import { Typography } from "@mui/material";
import Userlist from "./Userlist";

function App() {
  // Build a user management app with a basic user interface that shows a list of users and provides options for add and remove users.
  // Use node.js, React and MongoDb technology.
  // Address software engineering aspects like:
  // Build process
  // Create CI-CD facilitation using Dockers.
  // Unit testing
  // Securit
  const [userList, setUserlist] = useState([]);
  const [newUser, setNewuser] = useState("");
  const [userAdded, setUseradded] = useState(false);

  //Get new User
  function handleChange(e) {
    setNewuser((el) => e.target.value);
  }

  useEffect(() => {
    async function getUsers() {
      const res = await fetch("http://localhost:3001/getUsers");
      const data = await res.json();

      const usersArray = data.users;
      console.log(usersArray);
      setUserlist((el) => [...usersArray]);
    }
    getUsers();
  }, [userAdded]);

  //Add new user
  function handleAdd() {
    // setUserlist((el) => [...el, newUser]);

    setUseradded((el) => false);
    async function addData() {
      try {
        const response = await fetch("http://localhost:3001/addUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: newUser,
          }),
        });

        const data = await response.json();
        console.log("Success:", data);
        setUseradded((el) => true);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    addData();
  }

  return (
    <>
      {" "}
      <ButtonAppBar />
      <div className="App">
        <Adduser
          userList={userList}
          setUserlist={setUserlist}
          handleChange={handleChange}
          handleAdd={handleAdd}
        />

        {userList.length > 0 && (
          <div className="userslist">
            <div className="userheading">
              <Typography variant="h6">User Name</Typography>
              <Typography variant="h6"> Remove User </Typography>
            </div>
            <div className="">
              {userList.map((el) => (
                <Userlist
                  userName={el}
                  userList={userList}
                  setUserlist={setUserlist}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
