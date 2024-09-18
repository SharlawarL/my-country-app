import Dashboard from '../components/Dashboard';

const Home = () => {
  return (
    <div style={{width: '80%', margin: '10px auto'}}>
      <h1 style={{fontSize: 50, textAlign: 'center'}}>Country Dashboard</h1>
      <Dashboard />
    </div>
  );
};

export default Home;