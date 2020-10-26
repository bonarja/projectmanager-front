interface ItemCustomTable {
  name?: string; // nombre a mostrar en la columna
  id?: string; // si no hay id sera el mismo name en camelize
  width?: number; // ancho de la columna ([autosize] debera ser false en el componente)
  style?: any; // stilos a aplicar en la columna
  check?: boolean; // transforma una columna en checkbox
  filter?: boolean; // habilita el filtro de busqueda en la columna
  sortable?: boolean; // habilita la capacidad de re-ordenar la posicion de la columna
  lockPosition?: boolean; // bloquea la documentacion de la columna
  resizable?: boolean; // habilita la capacidad de cambiar el ancho
  checkHeader?: boolean; // habilita un checkbox global para toda la columna
  cellRenderer?({ data }): any; // el retorno de esta funcion dibuja el html de la celda
}
export declare type HeaderCustomTable = Array<
  ItemCustomTable | 
  string | // nombre y la id sera el mismo nombre en camecase
  Array<string> // primera posicion es el nombre, la segunda es la id y la tercera el ancho
>
