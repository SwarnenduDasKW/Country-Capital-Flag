import React, { useContext, createContext, useState, useMemo } from "react";

export const AnswerContext = createContext();

// function useAnswer() {
//   const context = useContext(AnswerContext);
//   if (!context) {
//     throw new Error("useAnswer must be used in a AnswerProvider");
//   }
//   return context;
// }

// function AnswerProvider(props) {
//   const [answer, setAnswer] = useState([{ country: null, capital: null }]);
//   const value = useMemo(() => ({ answer, setAnswer }), [answer]);

//   return <AnswerContext.Provider value={value} {...props} />;
// }

// export { AnswerProvider, useAnswer };
