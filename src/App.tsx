import * as React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import LoginModal from "components/Modal/LoginModal";

export default function App() {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <>
      <MainLayout
        handleModalOpen={() => setModalOpen(true)}
        handleModalClose={() => setModalOpen(false)}
      >
        <Routes>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </MainLayout>
      {modalOpen && <LoginModal handleModalClose={() => setModalOpen(false)} />}
    </>
  );
}

function NoMatch() {
  return <h2>404 - Not Found</h2>;
}
