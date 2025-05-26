import { useState } from "react";
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
import api from "../services/api";

function FormularioAddTask({ onClose }) {
  const [form, setForm] = useState({
    numeroTask: "",
    descricaoTask: "",
    sprintTask: "",
    dataInicioTask: "",
    dataTerminoTask: "",
    prazoTerminoTask: "",
    aceTask: false,
    aprendizadoTask: "",
    dificuldadeTask: "",
    comentariosTask: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  async function createTasks() {
    await api.post("/tasks", {
      ...form,
      numeroTask: Number(form.numeroTask),
      dificuldadeTask: Number(form.dificuldadeTask),
      dataInicioTask: form.dataInicioTask
        ? new Date(form.dataInicioTask).toISOString()
        : null,
      dataTerminoTask: form.dataTerminoTask
        ? new Date(form.dataTerminoTask).toISOString()
        : null,
      prazoTerminoTask: form.prazoTerminoTask
        ? new Date(form.prazoTerminoTask).toISOString()
        : null,
    });
    if (onClose) onClose();
  }

  return (
    <Box
      display="flex"
      flexDirection={"column"}
      justifyContent="center"
      alignItems="start"
      height="auto"
      gap="16px"
    >
      <Typography variant="h5" textAlign="center">
        Adicione sua Task
      </Typography>
      <TextField
        label="Número da Task"
        type="number"
        name="numeroTask"
        value={form.numeroTask}
        onChange={handleChange}
        fullWidth
        required
      />
      <Box sx={{ display: "flex", gap: 3, maxWidth: "100%" }}>
        <TextField
          label="Sprint"
          name="sprintTask"
          value={form.sprintTask}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Data de início"
          type="date"
          name="dataInicioTask"
          value={form.dataInicioTask}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
          required
        />
      </Box>
      <Box sx={{ display: "flex", gap: 3, maxWidth: "100%" }}>
        <TextField
          label="Data de término"
          type="date"
          name="dataTerminoTask"
          value={form.dataTerminoTask}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="Prazo final"
          type="date"
          name="prazoTerminoTask"
          value={form.prazoTerminoTask}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
          placeholder=""
          required
        />
      </Box>

      <TextField
        label="Descrição rápida"
        name="descricaoTask"
        value={form.descricaoTask}
        onChange={handleChange}
        fullWidth
        required
      />

      <TextField
        label="Pontos de aprendizado"
        name="aprendizadoTask"
        value={form.aprendizadoTask}
        onChange={handleChange}
        fullWidth
        multiline
        rows={2}
      />

      <FormControlLabel
        control={
          <Checkbox
            name="aceTask"
            checked={form.aceTask}
            onChange={handleChange}
          />
        }
        label="Passou de primeira?"
      />

      <TextField
        label="Dificuldade"
        type="number"
        name="dificuldadeTask"
        value={form.dificuldadeTask}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Comentários"
        name="comentariosTask"
        value={form.comentariosTask}
        onChange={handleChange}
        fullWidth
        multiline
        rows={2}
      />
      <Button
        variant="contained"
        sx={{ margin: "auto", width: "100%" }}
        onClick={createTasks}
      >
        Enviar
      </Button>
    </Box>
  );
}

export default FormularioAddTask;
