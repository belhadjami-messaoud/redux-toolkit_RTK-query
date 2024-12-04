// import React, { useEffect } from "react";
// import { loadUser } from "../../features/authSlice";
// import { useSelector, useDispatch } from "react-redux";
// export default function profile() {
//   const { isloading, user } = useSelector((store) => store.auth);
//   const dispatch = useDispatch();
//   const handleSubmit = () => {};

//   // useEffect(() => {
//   //   dispatch(loadUser());
//   // }, []);

//   if (isloading) {
//     console.log(user);
//     return <p>loadiingggggggggggggggggggggggggggggg</p>;
//   }

//   return (
//     <div>
//       {user ? user.user : null}
//       {/* {user ? (
//         <div>
//           <p>{user.user}</p>
//           <p>{user.role}</p>
//           <p>{user.userId}</p>
//         </div>
//       ) : (
//         <div>profile</div>
//       )} */}
//     </div>
//   );
// }

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!user) {
  //     dispatch(fetchUserData()); // قم باستدعاء الفنكشن التي تقوم بجلب البيانات
  //   }
  // }, [user, dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <div>
          <p>
            <strong>Name:</strong> {user.user}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default Profile;
