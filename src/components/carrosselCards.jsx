import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import api from "../services/api";
import { format } from "date-fns";
import SliderTrail from "./Card";

function CarrosselCards() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Exibir 1 card principal + 0.1 de cada lado
    slidesToScroll: 1,
    arrows: true, // Ativa botões de navegação
    centerMode: true, // Mantém o slide principal no centro
    adaptiveHeight: true, // Ajusta altura dos cards automaticamente
  };

  const [cards, setCards] = useState([]);
  const [sprints, setSprints] = useState({});

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

  useEffect(() => {
    api
      .get("/tasks")
      .then((response) => setCards(response.data))
      .catch((error) => console.error("Erro ao buscar tasks:", error));
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "10px" }}>
      {Object.keys(sprints).map((sprint) => (
        <div style={{marginBottom:'20px'}} key={sprint}>
          <h2 style={{ textAlign: "center" }}>Sprint {sprint}</h2>
          <SliderTrail cards={sprints[sprint]} />
        </div>
      ))}
    </div>
  );
}

export default CarrosselCards;
