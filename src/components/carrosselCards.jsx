import { Box, Button, Dialog, DialogContent, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import api from "../services/api";
import SliderTrail from "./Card";
import FormularioAddTask from "./formularioAddTask";

function CarrosselCards() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    adaptiveHeight: true,
  };

  const [cards, setCards] = useState([]);
  const [sprints, setSprints] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      const groupedBySprint = response.data.reduce((acc, task) => {
        acc[task.sprintTask] = acc[task.sprintTask] || [];
        acc[task.sprintTask].push(task);
        return acc;
      }, {});
      setSprints(groupedBySprint); // Atualiza o estado aqui!
    } catch (error) {
      console.error("Erro ao buscar tasks:", error);
      setSprints({});
    }
  };

  // Uso no useEffect
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const filteredSprints = Object.keys(sprints).reduce((acc, sprint) => {
    acc[sprint] = sprints[sprint].filter(
      (task) =>
        task.descricaoTask.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.numeroTask.toString().includes(searchQuery)
    );
    return acc;
  }, {});

  return (
    <>
      <div
        style={{
          maxWidth: { xs: "800px", sm: "90%", md: "90%" },
          width: { xs: "800px", sm: "1800px", md: "1800px" },
          margin: "auto",
          height: "96vh",
          padding: "10px",
          backgroundColor: "#CDD9E0",
          overflow: openModal ? "block" : "auto",
        }}
      >
        {/* Search Bar */}
        <Box style={{ display: "flex", gap: 20 }}>
          <TextField
            label="Pesquisar tarefas"
            variant="outlined"
            fullWidth
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Digite para buscar..."
            style={{ marginBottom: "20px" }}
          />

          <div>
            <Button variant="contained" onClick={() => setOpenModal(true)}>
              Adicionar
            </Button>
          </div>
        </Box>

        {/* Exibição dos cards filtrados */}
        {Object.keys(filteredSprints).map((sprint) => (
          <div style={{ marginBottom: "20px" }} key={sprint}>
            <h2
              style={{
                textAlign: "start",
                color: "#ffffff",
                textShadow: "2px 2px 2px rgba(0, 0, 0, 0.6)",
                paddingBottom: "5px",
              }}
            >
              Sprint {sprint}
            </h2>
            <SliderTrail
              cards={filteredSprints[sprint]}
              fetchTasks={fetchTasks}
              setCards={setCards}
            />
          </div>
        ))}
      </div>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <FormularioAddTask
            onClose={handleCloseModal}
            fetchTasks={fetchTasks}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CarrosselCards;
