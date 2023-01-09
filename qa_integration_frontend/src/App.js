import React, { useState, useEffect } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

/* Importing App's Components */
import {
  Login,
  Dashboard,
  WorkItemSelect,
  WorkItem,
  QALearning,
  KnowledgeSharing
} from "./Components";

const AnimatedRoutes = () => {

  const location = useLocation();
  return (
    <Routes location={location} key={location.key} >
      <Route path="/work-item/:id" element={<WorkItem />} />
      <Route path="/qa-learning" element={<QALearning />} />
      <Route path="/knowledge-sharing" element={<KnowledgeSharing />} />
      <Route path="/work-item-dash" element={<WorkItemSelect/>} />
      <Route path="/dash" element={<Dashboard/>} />
      <Route exact path="/" element={<Login />} />
    </Routes>
  );
};

const App = () => {
  return (
    <div>
      <Router key="router">
        <AnimatedRoutes />
      </Router>
    </div>
  );
};

export default App;