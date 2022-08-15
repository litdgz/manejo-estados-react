import React, { useEffect, useReducer } from "react";

const SECURITY_CODE = "paradigma";

export function UseReducer({ name }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const onConfirm = () => {
    dispatch({ type: actionTypes.CONFIRM})
  };

  const onError = () => {
    dispatch({ type: actionTypes.ERROR})
  };

  const onWrite = ({target: { value }}) => {
    dispatch({ type: actionTypes.WRITE, payload: value})
  };

  const onCheck = () => {
    dispatch({ type: actionTypes.CHECK})
  };

  const onDelete = () => {
    dispatch({ type: actionTypes.DELETE})
  };

  const onReset = () => {
    dispatch({ type: actionTypes.RESET})
  };


  console.log(state);

  useEffect(() => {
    console.log("Empezando el efecto");
    if (!!state.loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion");

        if (state.value === SECURITY_CODE) {
            onConfirm()
        } else {
            onError()
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
          onChange={onWrite}
        />
        <button
          onClick={onCheck}
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
          onClick={onDelete}
        >
          Si, eliminar
        </button>
        <button
          onClick={onReset}
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
          onClick={onReset}
        >
          Resetear, volver atras
        </button>
      </React.Fragment>
    );
  }
}


const initialState = {
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  }

const actionTypes = {
    ERROR: 'ERROR',
    CHECK: 'CHECK',
    CONFIRM: 'CONFIRM',
    WRITE: 'WRITE',
    DELETE: 'DELETE',
    RESET: 'RESET',
}

const reducerObject = (state, payload) => ({
    [actionTypes.ERROR]: {
        ...state,
        error: true,
        loading: false,
    },
    [actionTypes.CHECK]: {
        ...state,
        loading: true,
    },
    [actionTypes.CONFIRM]: {
        ...state,
        value: "",
        error: false,
        loading: false,
        confirmed: true,
      },
   [actionTypes.WRITE]: {
        ...state, value: payload,
    },
    [actionTypes.DELETE]: {
        ...state, deleted: true 
    },
    [actionTypes.RESET]: { 
        ...state, 
        confirmed: false, 
        deleted: false 
    }
})

const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type]
    } else {
        return state
    }
}