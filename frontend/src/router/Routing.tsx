import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import { HomePage } from "../pages/HomePage";
import { BooksPage } from "../pages/BooksPage";
import { ReadersPage } from "../pages/ReadersPage";
import { Layout } from "../components/layout/Layout";

export const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="Books" element={<BooksPage/>}/>
          <Route path="Readers" element={<ReadersPage/>}/>
        </Route>
      </Routes>
    </Router>
  )
}