import { Routes, Route } from "react-router-dom";

import Message from "./pages/Message";
import Setting from "./pages/Setting";
import { ModelProvider } from "./context/ModelContext";

const App = () => {
  return (
    <ModelProvider>
      <Routes>
        <Route path="/" element={<Message />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </ModelProvider>
  );
};

export default App;
