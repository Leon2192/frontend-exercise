import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./screens/Home/Home";
import NewTask from "./screens/NewTask/NewTask";
import TaskDetails from "./screens/TaskDetails/TaskDetails";
import NotFound from "./screens/NotFound/NotFound";
import FabTasks from "./components/shared/FABTasks/FabTasks";
import Error from "./screens/Error/Error";

const theme = createTheme();

function App() {
  return (
    <Router>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <FabTasks />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-task" element={<NewTask />} />
          <Route path="/task/:id" element={<TaskDetails />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
