import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { format } from "date-fns";
import { Button } from "@mui/material";
import api from "../services/api";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";

function SliderTrail({ cards, fetchTasks, setCards }) {
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

  const [expandido, setExpandido] = useState(false);

  async function deleteTask(id) {
    const confirmacao = window.confirm(
      "Tem certeza que deseja deletar esta task?"
    );
    if (confirmacao) {
      await api.delete(`/tasks/${id}`);
      setCards((prevCards) => prevCards.filter((card) => card.id !== id)); // ✅ Agora funciona!
      await fetchTasks();
      alert("Task deletada com sucesso!");
      await fetchTasks();
    }
  }

  // async function deleteTask(id) {
  //   await api.delete(`/tasks/${id}`);
  //   setCards((prevCards) => prevCards.filter((card) => card.id !== id)); // ✅ Agora funciona!
  //   await fetchTasks();
  // }

  return (
    <>
      <Slider {...settings}>
        {cards.map((card) => (
          <div key={card.id} style={{ padding: "10px", textAlign: "center" }}>
            <div
              style={{
                background: "linear-gradient(180deg, #7FD9F8, #3399FF)",
                padding: "20px",
                borderRadius: "10px",
                margin: "10px 10px",
                minHeight: expandido ? "500px" : "80px",
                maxHeight: expandido ? "500px" : "180px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>{card.aceTask ? "🏆" : "⛔"}</p>
                  <p
                    style={{
                      color: "#FFFFFF",
                      textShadow: "2px 2px 2px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    Sp:{card.sprintTask}
                  </p>
                </div>
                <h1
                  style={{
                    textAlign: "center",
                    fontWeight: "lighter",
                    textShadow: "2px 2px 2px rgba(0, 0, 0, 0.4)",
                    color: "#FFFFFF",
                    fontSize: "28px",
                    marginTop: "-15px",
                    marginBottom: "20px",
                  }}
                >
                  #{card.numeroTask}
                </h1>
                <div
                  style={{
                    height: "90px",
                    width: "80%",
                    margin: "auto",
                    textAlign: "center",
                    color: "#FFFFFF",
                    textShadow: "2px 2px 2px rgba(0, 0, 0, 0.4)",
                    fontSize: "18px",
                  }}
                >
                  <p>{card.descricaoTask}</p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      color: "#FFFFFF",
                      textShadow: "2px 2px 2px rgba(0, 0, 0, 0.4)",
                    }}
                  >
                    Conclusão:
                    <p
                      style={{
                        fontSize: "13px",
                        paddingTop: "5px",
                        color: "#FFFFFF",
                        textShadow: "2px 2px 2px rgba(0, 0, 0, 0.4)",
                      }}
                    >
                      {format(new Date(card.dataTerminoTask), "dd/MM/yyyy")}
                    </p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                      <p
                        style={{
                          color: "#FFFFFF",
                          textShadow: "2px 2px 2px rgba(0, 0, 0, 0.4)",
                        }}
                      >
                        Dificuldade:
                      </p>
                      {card.dificuldadeTask === 1
                        ? "⭐"
                        : card.dificuldadeTask === 2
                        ? "⭐⭐"
                        : "⭐⭐⭐"}
                    </div>
                  </div>
                </div>
                {!expandido && (
                  <Button
                    sx={{
                      mt: -6,
                      ml: "-20px",
                      height: "20px",
                      pt: "50px",
                      width: { lg: "103.5%",sm: "106.5%", md: "104.5%", xs: "250px" },
                      backgroundColor: "white",
                      background:
                        "linear-gradient(180deg, transparent,rgba(255, 255, 255, 0.47))",
                      borderRadius: 3.5,
                    }}
                    onClick={() => !expandido && setExpandido(true)}
                  >
                    <ExpandMoreIcon sx={{ color: "white" }} />
                  </Button>
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      color: "#FFFFFF",
                      textShadow: "2px 2px 2px rgba(0, 0, 0, 0.4)",
                    }}
                  >
                    Início:
                    <p
                      style={{
                        fontSize: "13px",
                        textAlign: "center",
                        paddingTop: "5px",
                        color: "#FFFFFF",
                        textShadow: "2px 2px 2px rgba(0, 0, 0, 0.4)",
                      }}
                    >
                      {format(new Date(card.dataInicioTask), "dd/MM/yyyy")}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      color: "#FFFFFF",
                      textShadow: "2px 2px 2px rgba(0, 0, 0, 0.4)",
                    }}
                  >
                    Prazo:
                    <p
                      style={{
                        fontSize: "13px",
                        textAlign: "center",
                        paddingTop: "5px",
                        color: "#FFFFFF",
                        textShadow: "2px 2px 2px rgba(0, 0, 0, 0.4)",
                      }}
                    >
                      {format(new Date(card.prazoTerminoTask), "dd/MM/yyyy")}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    paddingTop: "10px",
                    color: "#ffffff",
                    textShadow: "2px 2px 2px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  Habilidade fortalecida
                  <textarea
                    style={{
                      width: "98%",
                      marginTop: 10,
                      height: 60,
                      borderRadius: 10,
                      padding: 5,
                    }}
                    defaultValue={card.aprendizadoTask}
                  />
                </div>
                <div
                  style={{
                    paddingTop: "8px",
                    color: "#ffffff",
                    textShadow: "2px 2px 2px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  Comentários:
                  <textarea
                    style={{
                      width: "98%",
                      marginTop: 10,
                      height: 60,
                      borderRadius: 10,
                      padding: 5,
                    }}
                    defaultValue={card.comentariosTask}
                  />
                </div>
              </div>
              {expandido && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "13px",
                    width: "85%",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0px",
                      height: "25px",
                    }}
                  >
                    <Button onClick={() => deleteTask(card.id)}>
                      <DeleteIcon sx={{ color: "white" }} />
                    </Button>
                    {/* <Button
                      variant="contained"
                     
                      style={{
                        padding: "1px 25px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    > */}
                    <KeyboardArrowUpIcon
                      sx={{ color: "white" }}
                      onClick={() => setExpandido(false)}
                    />
                    {/* </Button> */}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
}

export default SliderTrail;
