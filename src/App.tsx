import { Route, Routes } from "react-router-dom";
import Index from "./components/Index";
import Otros from "./pages/Otros";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />}></Route>
      <Route path="/otros" element={<Otros />}></Route>
      <Route path="*" element={<Index />}></Route>
    </Routes>
  )
}

export default App