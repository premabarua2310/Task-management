// import React, { useState,createContext } from 'react';
// import jwt from "jsonwebtoken";

// const MyContext = createContext();



// function getInitialState() {
//   const notes = localStorage.getItem('usersinfo')
//   jwt.verify(notes, 'shhhhh', function(err, decoded) {
//     console.log(decoded.token) // bar
//   });


//   //return notes ? JSON.parse(notes) : []
// }


// const MyContextProvider = ({children}) => {
//   const [myState, setMyState] = useState(getInitialState);

//   return (
//     <MyContext.Provider value={{ myState, setMyState }}>
//       {children}
//     </MyContext.Provider>
//   );
// };

// export { MyContextProvider, MyContext };
