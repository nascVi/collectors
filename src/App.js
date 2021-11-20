import Nav from './components/nav/Nav';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './screens/HomePage'
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
import NotFound from './screens/NotFound'
import Blog from './screens/Blog'

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/blogs/" component={HomePage} />
        <Route path="/blogs/:id/" component={Blog} />
        <Route exact path="/signin/" component={SignIn} />
        <Route exact path="/signup/" component={SignUp} />
        <Route exact path="*" component={NotFound} />
      </Routes>
    </Router>
  );
}

export default App;
