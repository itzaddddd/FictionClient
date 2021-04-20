import './App.css'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home } from './components/home'
import { AppMenu } from './components/menu'
import { Result } from './components/result'
import { AddChapter } from './components/addChapter'

const GlobalStyle = styled.div`
  font-family: 'Bai Jamjuree', sans-serif;
`
function App() {
  return (
    <Router>
      <GlobalStyle>
        <AppMenu />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/result" component={Result} />
          <Route exact path="/add" component={AddChapter} />
        </Switch>
      </GlobalStyle>
    </Router>
  );
}

export default App;
