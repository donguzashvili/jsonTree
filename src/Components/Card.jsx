import React from "react";
import "../style/Card.css";

export default function Card(props) {
  return (
    <div className="card">
      <img src={props.data.image} alt="" />
      <div className="cardContent">
        <div>
          <h4>ID</h4> <p>{props.data.id}</p>
        </div>
        <div>
          <h4>Gender</h4>
          <p>{props.data.gender}</p>
        </div>
        <div>
          <h4>Name</h4>
          <p>{props.data.name}</p>
        </div>
        <div>
          <h4>Birthdate</h4>
          {props.data.birthDate ? <p>1981-24-07</p> : "Unknown"}
        </div>
        <div>
          <h4>{props.data.comment ? props.data.comment : "Friends of"}</h4>
          <p>
            {props.data.person
              ? props.data.person[0].ref + ", " + props.data.person[0].person
              : "no friends"}
          </p>
        </div>
      </div>
    </div>
  );
}
