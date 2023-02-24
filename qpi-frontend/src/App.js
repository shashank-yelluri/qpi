import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home";
import { UserDetails } from "./Components/UserDetails";
import { Users } from "./Components/Users";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/:userId" element={<UserDetails />} />
          <Route path="/users" element={<Users />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
