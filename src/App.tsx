import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </MainLayout>
  );
}

function NoMatch() {
  return <h2>404 - Not Found</h2>;
}
