import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './screens/HomePage'
import Navbar from './components/nav/Navbar';
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
import NotFound from './screens/NotFound'
import Blog from './screens/Blog'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/blogs/" element={<HomePage />} />
        <Route path="/blogs/:id/" element={<Blog />} />
        <Route exact path="/signin/" element={<SignIn />} />
        <Route exact path="/signup/" element={<SignUp />} />
        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
