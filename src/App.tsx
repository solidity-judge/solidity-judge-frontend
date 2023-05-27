import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import ProblemPage from "pages/ProblemPage";
import ProblemsPage from "pages/ProblemsPage";
import { useAppSelector } from "redux/hooks";
import { ModalType } from "constants/modal";
import RegisterModal from "components/Modal/RegisterModal";
import RankingPage from "pages/RankingPage";
import ContestsPage from "pages/ContestsPage";

export default function App() {
  const modal = useAppSelector((state) => state.modal);
  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="" element={<Navigate to="problems" replace />} />
          <Route path="problems" element={<ProblemsPage />} />
          <Route path="problems/:problemId" element={<ProblemPage />} />
          <Route path="ranking" element={<RankingPage />} />
          <Route path="contests" element={<ContestsPage />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </MainLayout>
      {modal === ModalType.REGISTER_USER && <RegisterModal />}
    </>
  );
}

function NoMatch() {
  return <h2>404 - Not Found</h2>;
}
