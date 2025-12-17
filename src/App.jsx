import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Quiz from './pages/Quiz';
import Admin from './pages/Admin';
import Registration from './pages/Registration';
import './scss/main.scss';
import { useEffect } from 'react';
import { useAppContext } from './context/ContextProvider';
import QuizStatus from './pages/QuizStatus';
import Winners from './pages/Winners';

function App() {
  const { uniqId, setUniqId, API_BASE_URL } = useAppContext();

  useEffect(() => {
    fetch(`${API_BASE_URL}createUser.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          console.log('Saved uniq_id:', data.uid);
          setUniqId(data.uid); // stored in global context
        } else {
          console.error('Error:', data.message);
          alert(123);
        }
      })
      .catch((err) => console.error('Fetch error:', err));
  }, [setUniqId, API_BASE_URL]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/quizStatus" element={<QuizStatus />} />
      <Route path="/winners" element={<Winners />} />
    </Routes>
  );
}

export default App;
