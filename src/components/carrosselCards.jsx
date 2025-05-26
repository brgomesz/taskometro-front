import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from "../services/api";
import SliderTrail from "./Card";
import { Button, Dialog, DialogContent } from "@mui/material";
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

  useEffect(() => {
    api
      .get("/tasks")
      .then((response) => {
        const groupedBySprint = response.data.reduce((acc, task) => {
          acc[task.sprintTask] = acc[task.sprintTask] || [];
          acc[task.sprintTask].push(task);
          return acc;
        }, {});
        setSprints(groupedBySprint);
      })
      .catch((error) => console.error("Erro ao buscar tasks:", error));
  }, []);

  // Opcional: recarregar tasks após adicionar uma nova
  const handleCloseModal = () => {
    setOpenModal(false);
    // Você pode recarregar as tasks aqui se quiser atualizar a lista automaticamente
    // window.location.reload(); // ou refaça a chamada da API
  };

  return (
    <>
      <div
        style={{
          maxWidth: "800px",
          margin: "auto",
          padding: "10px",
          backgroundColor: "#CDD9E0",
          overflow: openModal ? "block" : "auto",
        }}
      >
        <div>
          <Button variant="contained" onClick={() => setOpenModal(true)}>
            Adicionar
          </Button>
        </div>
        {Object.keys(sprints).map((sprint) => (
          <div style={{ marginBottom: "20px" }} key={sprint}>
            <h2 style={{ textAlign: "center" }}>Sprint {sprint}</h2>
            <SliderTrail cards={sprints[sprint]} />
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
          <FormularioAddTask onClose={handleCloseModal} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CarrosselCards;
