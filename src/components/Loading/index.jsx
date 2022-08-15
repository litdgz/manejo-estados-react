import React, { Component } from "react";

export class Loading extends Component {
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }
  render() {
    return <p>Cargando...</p>;
  }
}
