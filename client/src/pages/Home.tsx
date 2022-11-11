import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { selectUser } from '../features/user.slice';
import Hero from '../components/Hero';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

function Home() {
  const user = useTypedSelector(selectUser);

  console.log('user home', user);

  return (
    <>
      <Hero />
      {user && <p>Hello {user.id}</p>}
    </>
  );
}

export default Home;
