import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';


const Home = () => {

  const {loading, data} = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];
 

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {loading ? (
            <div>loading...</div>
          ):(
            <ThoughtList thoughts={thoughts} title="some fertilizer for Thought(s)..."/>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
