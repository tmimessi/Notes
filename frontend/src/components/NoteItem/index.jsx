import { FiPlus, FiX } from "react-icons/fi";

import { Container } from "./styles";

export function NoteItem({isNew, value, onClick, ...rest}) {
  return (
    <Container isNew={isNew}>
      <input 
      type="text"
      value={value}
      readOnly={!isNew} // para um item que já foi adicionado, não será possível editar, vai ficar somente leitura, ou seja, se não é um item novo, pode bloquear
      {...rest}
      />

      <button 
      type="button" 
      onClick={onClick}
      className={isNew ? "button-add" : "button-delete"} // se for uma nova nota, adicionar a classe estilizada button-add, senão, adicionar a de delete.
      >


        {isNew ? <FiPlus /> : < FiX />}
      </button>
    </Container>
  )
}