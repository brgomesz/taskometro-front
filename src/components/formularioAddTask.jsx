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

function FormularioAddTask() {
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
    // getUsers(); // Se necessário
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 500 }}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Formulário da Task
        </Typography>
        <Grid container spacing={2} component="form">
          <Grid item xs={12}>
            <TextField
              label="Número da Task"
              type="number"
              name="numeroTask"
              value={form.numeroTask}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Descrição rápida"
              name="descricaoTask"
              value={form.descricaoTask}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Sprint"
              name="sprintTask"
              value={form.sprintTask}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
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
          </Grid>
          <Grid item xs={6}>
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Prazo final"
              type="date"
              name="prazoTerminoTask"
              value={form.prazoTerminoTask}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Pontos de aprendizado"
              name="aprendizadoTask"
              value={form.aprendizadoTask}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Dificuldade"
              type="number"
              name="dificuldadeTask"
              value={form.dificuldadeTask}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Comentários"
              name="comentariosTask"
              value={form.comentariosTask}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={createTasks}>
              Enviar
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default FormularioAddTask;
