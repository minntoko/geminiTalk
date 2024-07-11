import { Routes, Route } from "react-router-dom";

import Message from "./pages/Message";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Message />} />
      </Routes>
    </>
  );
};

export default App;
