import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHT } from '../utils/queries';
import ReactionList from '../components/ReactionList';

const SingleThought = props => {
  // this will capture id put into url
  const { id: thoughtId } = useParams();

  // declare our useQuery as to destructured variables both of which are return values for use query
  const { loading, data } = useQuery(QUERY_THOUGHT,{
    variables: { id: thoughtId }
  });

  const thought = data?.thought || {};

  if(loading) {
    return <div>Loading...</div>
  }
  
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
           {thought.username}
          </span>{' '}
          thought on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
        </div>
      </div>

      {thought.reactionCount > 0 && <ReactionList reactions={thought.reactions} />}
    </div>
  );
};

export default SingleThought;
