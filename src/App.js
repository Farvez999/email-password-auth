import { getAuth } from "firebase/auth";
import './App.css';
import app from "./firebase/firebase.init";

const auth = getAuth(app);

function App() {
  const handleSubmitRegister = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password)
  }
  return (
    <div className="App">
      <form onSubmit={handleSubmitRegister}>
        <input type="email" name="email" id="" placeholder="Your email" />
        <br />
        <input type="password" name="password" id="" placeholder="Your password" />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default App;
