import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PATHS from "./constants/paths";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Participants = lazy(() => import("./pages/Participants"));
const ParticipantStatus = lazy(() => import("./pages/ParticipantStatus"));
const ParticipantRegister = lazy(() => import("./pages/ParticipantRegister"));
const Editions = lazy(() => import("./pages/Editions"));
const EditionDetails = lazy(() => import("./pages/EditionDetails"));

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={PATHS.HOME} element={<Home />} />
        <Route path={PATHS.LOGIN} element={<Login />} />
        <Route path={PATHS.REGISTER} element={<Register />} />
        <Route path={PATHS.PARTICIPANTS} element={<Participants />} />
        <Route path={PATHS.EDITIONS} element={<Editions />} />
        <Route path={PATHS.EDITION_DETAILS(":id")} element={<EditionDetails />} />
        <Route
          path={PATHS.PARTICIPANT_REGISTER}
          element={<ParticipantRegister />}
        />
        <Route
          path={PATHS.PARTICIPANT_STATUS}
          element={<ParticipantStatus />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
