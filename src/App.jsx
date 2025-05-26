import { useState } from "react";
import "./App.css";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import api from "./services/api";
import FormularioAddTask from "./components/formularioAddTask";
import CarrosselCards from "./components/carrosselCards";
function App() {
  const [showFormulario, setShowFormulario] = useState(false);
  return (
    <>
      {showFormulario && <FormularioAddTask />}     
      <CarrosselCards />
    </>
  );
}

export default App;
