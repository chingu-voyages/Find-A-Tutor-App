import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { selectUser } from '../features/user.slice';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

function Home() {
  const user = useTypedSelector(selectUser);

  console.log('user home', user);

  return (
    <div>
      <h1>Home Page</h1>
      {user && <p>Hello {user.id}</p>}
    </div>
  );
}

export default Home;
