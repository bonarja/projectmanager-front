# Custom AG Grid

### Requiere

- ag-grid-angular
- ag-grid-community
- jspdf
- jspdf-autotable

```
npm install --save ag-grid-angular ag-grid-community jspdf jspdf-autotable
```

# Uso

`<CustonTable>`

```html
<CustomTable [header]="header" [data]="data"></CustomTable>
```

## Recibe principalmente 2 parámetros:

## [Header]

Corresponde a la configuración del encabezado de la tabla el cual se encuentra tipeado mediante la interface `HeaderCustomTable` localizada en `custom-table.interface.ts`. Este debe ser un arreglo el cual puede ser de 3 tipos:

```typescript
export declare type HeaderCustomTable = Array<
  | ItemCustomTable
  | string // nombre y la id sera el mismo nombre en camelcase
  | Array<string> // primera posicion es el nombre, la segunda es la id y la tercera el ancho
>;
```

```typescript
interface ItemCustomTable {
  name?: string; // nombre a mostrar en la columna
  id?: string; // si no hay id sera el mismo name en camelcase
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
```

**Nota:** Todos los anchos asignados en el header solo funcionaran si `<customTable [autosize]="false">`

### Header ejemplo

```typescript
tableHeader: HeaderCustomTable = [
  {
    name: "Seleccionar",
    check: true,
    sortable: false,
    resizable: false,
    filter: false,
  },
  "Nombre",
  "Edad",
  {
    id: "edad",
    name: "Es Mayor",
    cellRenderer: ({ data }) => `${data.edad >= 18 ? "si" : "no"}`,
  },
  {
    id: "edad",
    name: "Es Mayor",
    cellRenderer: ({ data }) => `
        <div class="cover center">
            <div style="
            width: 40px;
            height: 27px;
            border-radius: 4px;
            background-color: ${data.edad >= 18 ? "green" : "red"};
            "></div>
         </div>`,
  },
];
```

## [data]

Corresponde a una colección de datos, cada key se relacionara con la id del header par determinar en que columna se mostrará.

### Data ejemplo para el header anterior

```typescript
tableData: Array<any> = [
    {nombre: "User 1", edad: 17},
    {nombre: "User 2", edad: 22},
]
```

```typescript
tableData: any = Array(20)
  .fill(0)
  .map((x, i) => ({ nombre: `User ${i + 1}`, edad: 12 + i }));
```

## CustomTable parametros

```typescript
  @Input() autosize: boolean = true; // desactivar para asignar ancho especifico por columna
  @Input() resizable: boolean = true;
  @Input() onReady: Function = null;
  @Input() onSelect: Function = null; // function callback al seleccionar una fila (retorna el ítem de la colección)
  @Input() lockPosition: boolean = false;
  @Input() search: boolean = false; // activar filtro de búsqueda global
  @Input() title: string = null; // mostrar un titulo superior en la tabla
  @Input() export: boolean = false; // mostrar exportar en pdf y csv
  @Input() exportName: string = "export"; // titulo de archivo al exportar
  @Input() autoUnselect: boolean = true; // deseleccionar fila automáticamente después de ejecutar onSelect
```
