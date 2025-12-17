import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../context/ContextProvider';

function Winners() {
  const { API_BASE_URL } = useAppContext();
  const [winners, setWinners] = useState([]); // always an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const res = await axios.post(`${API_BASE_URL}webservice.php`, {
          savetype: 'getWinners',
        });

        if (res.data.status === 'success' && Array.isArray(res.data.data)) {
          setWinners(res.data.data);
        } else {
          setWinners([]);
        }
      } catch (err) {
        console.error('Error fetching winners:', err);
        setError('Failed to load winners. Please try again later.');
        setWinners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWinners();
  }, [API_BASE_URL]);

  if (loading) return <div className="winners">Loading winners...</div>;
  if (error) return <div className="winners">{error}</div>;

  return (
    <div className="winners">
      <h2>Thank You for Participating</h2>
      <h2>Winners</h2>
      {winners.length === 0 ? (
        <p>No winners yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {winners.map((winner, index) => (
              <tr key={winner.uid || index}>
                <td>{winner.name || '-'}</td>
                <td>{winner.email || '-'}</td>
                <td>{winner.company || '-'}</td>
                <td>{winner.score || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Winners;
