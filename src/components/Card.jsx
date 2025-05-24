import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import api from "../services/api";
import { format } from "date-fns";

function SliderTrail({cards }) {
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

  return (
    <>
    {/* <div>Sprint</div> */}
    <Slider {...settings}>
        
      {cards.map((card) => (
        
        <div key={card.id} style={{ padding: "10px", textAlign: "center" }}>
          {/* Aqui está o card */}
          <div
            style={{
              background: "linear-gradient(180deg, #7FD9F8, #3399FF)",
              padding: "20px",
              borderRadius: "10px",
              margin: "10px 10px",
              minHeight: "180px",
              maxHeight: "180px",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p>
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
                  Conclusão:
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
              </div>
              <div hidden>
                <p>{card.dataInicioTask}</p>
                <p>{card.prazoTerminoTask}</p>
                <p>{card.aprendizadoTask}</p>
                <p>{card.dificuldadeTask}</p>
                <p>{card.comentariosTask}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
    </>
  );
}

export default SliderTrail;
