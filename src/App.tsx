import { Routes, Route } from "react-router-dom";

import Message from "./pages/Message";
import Setting from "./pages/Setting";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Message />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </>
  );
};

export default App;
