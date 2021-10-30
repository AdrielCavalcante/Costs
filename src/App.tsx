import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/pages/Home';
import NewProject from './components/pages/NewProject';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';

import Container from './components/layout/Container/Container';
import Navbar from './components/layout/NavBar/Navbar';
import Footer from './components/layout/Footer/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Container custom="min-height">
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/newproject">
            <NewProject />
          </Route>
          <Route path="/project/:id">
            <Project />
          </Route>
         </Container> 
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
