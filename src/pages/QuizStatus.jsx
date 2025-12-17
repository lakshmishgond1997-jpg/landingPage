import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../context/ContextProvider';

function QuizStatus() {
  const { API_BASE_URL } = useAppContext();
  const [quizStatus, setQuizStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizStatus = async () => {
      try {
        const res = await axios.post(`${API_BASE_URL}webservice.php`, {
          savetype: 'getQuizStatus',
        });
        if (res.data.status === 'success') {
          setQuizStatus(res.data.quizStatus);
        }
      } catch (err) {
        console.error('Error fetching quiz status:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizStatus();
  }, [API_BASE_URL]);

  if (loading) return <div className="quizStatus">Loading...</div>;

  return (
    <div className="quizStatus">
      <p>{quizStatus ? 'Active' : 'Coming Soon'}</p>
    </div>
  );
}

export default QuizStatus;
