import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router, Routes,
  Route
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArticleListPage from './pages/ArticleListPage';
import AboutPage from './pages/AboutPage';
import {ArticlePage }from './pages/ArticlePage'
import NavBar from './NavBar';
import NotFound from './pages/NotFoundpage';

function App() {
  return (
    <Router>
      <NavBar />
      <div className='App'>

        <div id="page-body">

          <Routes>
          <Route path="*" element={<NotFound />} />
            <Route exact path="/" element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="art" element={<ArticleListPage />} />
            <Route path="art/:name" element={<ArticlePage />} />
           
          </Routes>
        </div>
      </div>

    </Router>
  );
}

export default App;


