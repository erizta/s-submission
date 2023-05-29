import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Activity from "./pages/Activity";

function App() {
  return (
    <div className="">
      <div className="w-full main-color">
        <div className="container mx-auto">
          <h4 className="py-10 text-2xl font-bold text-white mx-28 uppercase">
            to do list app
          </h4>
        </div>
      </div>
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/detail/:id" element={<Activity />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
