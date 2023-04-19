import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './screens/Home';
import { Clinic } from './screens/Clinic';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clinic/:id" element={<Clinic />} />
      </Routes>
    </Router>
  );
}
