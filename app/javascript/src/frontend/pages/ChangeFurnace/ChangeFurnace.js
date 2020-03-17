import React from "react";

import "./ChangeFurnace.scss";
import { PageTitle } from "../../components";

const ChangeFurnace = () => (
  <div className="change-furnace">
    <PageTitle title="Zmień piec" />
    <div className="change-furnace__heading">
      Wymień kocioł i nie płać mandatu!
    </div>
    <div className="change-furnace__content">
      <p>
        Likwidacja wszystkich przestarzałych instalacji grzewczych (kopciuchów)
        musi nastąpić do końca 2022 roku, a kotłów 3 i 4 klasy do końca 2026
        roku.
      </p>
      <p>Taki obowiązek wynika z uchwały antysmogowej dla Małopolski.</p>
      <p>
        Wszystkie bezklasowe instalacje grzewcze takie jak: kotły, piece, kozy,
        kominki na paliwa stałe muszą być wymienione do końca 2022 roku. Za
        naruszenie przepisów uchwały, mieszkaniec może być ukarany mandatem do
        500 zł lub grzywną do 5 000 zł.
      </p>
      <p className="change-furnace__content--bold">
        <span>Dowiedz się więcej: </span>
        <a
          href="https://powietrze.malopolska.pl/antysmogowa/powietrze.malopolska.pl/zmienpiec/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Małopolska W Zdrowej Atmosferze
        </a>
      </p>
      <p> Na wymianę kotła można dostać dofinansowanie:</p>
      <ul>
        <li>w Urzędzie Gminy</li>
        <li>
          w Wojewódzkim Funduszu Ochrony Środowiska i Gospodarki Wodnej w
          Krakowie
        </li>
      </ul>
      <p className="change-furnace__content--bold">
        <span>Dowiedz się więcej: </span>
        <a
          href="https://powietrze.malopolska.pl/dofinansowanie/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Dofinansowanie do wymiany pieców
        </a>
      </p>
    </div>
  </div>
);

export default ChangeFurnace;
