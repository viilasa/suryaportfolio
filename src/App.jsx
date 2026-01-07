import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  HomePage,
  BlogsPage,
  ThingsILikePage,
  PortfoliosPage,
  ContactPage
} from './pages';
import BlogPostPage from './pages/BlogPostPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:slug" element={<BlogPostPage />} />
        <Route path="/things-i-like" element={<ThingsILikePage />} />
        <Route path="/portfolios" element={<PortfoliosPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
