import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { selectUser } from '../features/user/slice';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

function Home() {
  const user = useTypedSelector(selectUser);

  return (
    <div>
      <h1>Home Page</h1>
      {user && <p>Hello {user.firstName}</p>}
    </div>
  );
}

export default Home;
