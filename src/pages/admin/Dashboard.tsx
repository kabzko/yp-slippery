import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../../redux/apiSlice';
import { RootState } from '../../redux/store';
import { useEffect } from 'react';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.api);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  return (
    <div className="flex">
      <main className="flex-1 p-4">
        <div>
          {loading}
          {error && <p className="text-red-500">{error}</p>}
          {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
