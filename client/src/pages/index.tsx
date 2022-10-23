// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { TypedUseSelectorHook } from 'react-redux';
// // import { useLoaderData } from 'react-router-dom';
// import { RootState, UseAppDispatch } from '../app/store';
// import { getUsers } from '../features/user/service';
// import { selectStatus, selectUsers } from '../features/user/slice';
// import { User } from '../features/user/types';

// const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

// function Index() {
//   // useLoaderData();
//   const dispatch = UseAppDispatch();
//   const users = useTypedSelector(selectUsers);
//   const userLoadStatus = useTypedSelector(selectStatus);

//   useEffect(() => {
//     dispatch(getUsers('n/a'));
//   }, [dispatch]);

//   console.log(userLoadStatus);
//   console.log(users);

//   return (
//     <div className="w-screen h-full flex flex-col justify-center items-center">
//       <h1 className="prose">Hello World!</h1>
//       <button className="btn btn-primary text-neutral w-fit">
//         I am a button
//       </button>
//       {userLoadStatus === 'succeeded' &&
//         users.map((user: User, index: number) => (
//           <p key={index}>{user.name}</p>
//         ))}
//     </div>
import { Outlet } from 'react-router-dom';

function Index() {
  return (
    <>
      <p>Navbar</p>
      <div className="w-screen h-full flex flex-col justify-center items-center">
        <Outlet />
      </div>
      <p>Footer</p>
    </>
  );
}

export default Index;
