import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home } from './components/home'
import { AppMenu } from './components/menu'
import { Result } from './components/result'
import { AddChapter } from './components/addChapter'

function App() {
  return (
    <Router>
      <AppMenu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/result" component={Result} />
        <Route exact path="/add" component={AddChapter} />
      </Switch>
    </Router>
  );
}

export default App;
