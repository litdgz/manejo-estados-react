import React, { useEffect, useState } from "react";

const SECURITY_CODE = "paradigma";

export function UseState({ name }) {
  const [state, setState] = useState({
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  console.log(state);

  const onConfirm = () => {
    setState({
      ...state,
      value: "",
      error: false,
      loading: false,
      confirmed: true,
    });
  };

  const onError = () => {
    setState({ ...state, value: "", error: true, loading: false });
  };

  const onWrite = (newValue) => {
    setState({ ...state, value: newValue });
  };

  const onCheck = () => {
    setState({ ...state, loading: true });
  };

  const onDelete = () => {
    setState({ ...state, deleted: true });
  };

  const onReset = () => {
    setState({ ...state, confirmed: false, deleted: false });
  };

  useEffect(() => {
    console.log("Empezando el efecto");
    if (!!state.loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion");

        if (state.value === SECURITY_CODE) {
          onConfirm();
        } else {
          onError();
        }

        console.log("Terminando la validacion");
      }, 2000);
    }
    console.log("Terminando el efecto");
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>

        <p>Por favor, escriba el codigo de seguridad.</p>

        {state.error && !state.loading && <p>Error: el codigo es incorrecto</p>}
        {state.loading && <p>Cargando...</p>}

        <input
          type="text"
          placeholder="Codigo de seguridad"
          value={state.value}
          onChange={(event) => onWrite(event.target.value)}
        />
        <button
          onClick={() => {
            onCheck();
            // setError(false);
          }}
        >
          Comprobar
        </button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <h2>Eliminar {name}</h2>
        <p>Pedimos confirmacion, ¿Estas seguro?</p>
        <button
          onClick={() => {
            onDelete();
          }}
        >
          Si, eliminar
        </button>
        <button
          onClick={() => {
            onReset();
          }}
        >
          Nop, me arrepenti
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h2>Eliminar {name}</h2>
        <p>La tarea fue eliminado con exito</p>
        <button
          onClick={() => {
            onReset();
          }}
        >
          Resetear, volver atras
        </button>
      </React.Fragment>
    );
  }
}
