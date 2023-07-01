import Alert from "./components/Alert";
import axios from "axios";
import Button from "./components/Button";
import Like from "./components/Like";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

function App() {
  const [showAlert, setShowAlert] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data));
  }, []);

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
