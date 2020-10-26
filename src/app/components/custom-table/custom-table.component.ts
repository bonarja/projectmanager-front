import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { RowNode } from 'ag-grid-community';
import { MenuItem } from "./menuitem";
import jsPDF from "jspdf";
import "jspdf-autotable";
@Component({
  selector: 'CustomTable',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./ag-grid.scss','./custom-table.component.scss'],
})
export class CustomTableComponent implements OnInit {
  @Input() header: Array<any> = [];
  @Input() data: Array<any> = [];
  @Input() width: string = null;
  @Input() autosize: boolean = true;
  @Input() resizable: boolean = true;
  @Input() onReady: Function = null;
  @Input() onSelect: Function = null;
  @Input() multiple: boolean = true;
  @Input() height: number = null;
  @Input() select: boolean = false;
  @Input() onshow: Function = null;ººº
  @Input() pagination: number = null;
  @Input() lockPosition: boolean = false;
  @Input() onscrollend: Function = null;
  @Input() onchange: Function = null;
  @Input() search: boolean = false;
  @Input() title: string = null;
  @Input() export: boolean = false;
  @Input() exportName: string = "export";
  @Input() autoUnselect: boolean = true;
  @Input() copyJson: boolean = false;
  columnDefs = [];
  rowData = [];
  api: any = false;
  columnApi: any = false;
  options: any = {
    domLayout: 'autoHeight',
    // suppressHorizontalScroll: this.pagination !== null ? true : false,
    // suppressMaxRenderedRowRestriction: true,
    // rowBuffer: 0,
    onSelectionChanged: (el: any) => {
      if(this.onSelect) {
        const Select = this.api.getSelectedRows();
        if (!Select.length) return;
        this.onSelect(Select[0]);
        this.autoUnselect && setTimeout(() => {
          this.unSelect();
        }, 200);
      }
      !this.multiple && this.onSelectionChanged();
    },
  };
  updateEnCola: any = null;
  addEnCola: any = null;
  $seleccionada: any = null;
  seleccionada: any = null;
  filterValue: string = '';
  menuItem: MenuItem;
  constructor(private me: ElementRef) {

    const menuList = [
      {
        name: "Copiar celda", 
        action:(el: HTMLElement) => {
          this.copyTextToClipboard(el.innerHTML);
        }
      }, {
        name: "Copiar fila", 
        action:(el: HTMLElement)=> {
          const text = el.parentElement.innerText.replace(/\n/g, ",");
          this.copyTextToClipboard(text);
        }
      },
    ]
    this.copyJson && menuList.push({
      name: "Copiar JSON", 
      action:(el: HTMLElement)=> {
        const index = Number(el.parentElement.getAttribute("row-index"));
        const fila = this.get(index);
        this.copyTextToClipboard(JSON.stringify(fila));
      }
    });

    this.menuItem = new MenuItem({
      activator: me.nativeElement,
      menuList,
      selectorClass: "ag-cell"
    });
  }

  copyTextToClipboard(text: string) {
    if (!navigator.clipboard) {
      alert("El navegador no soporta esta función")
      return;
    }
    navigator.clipboard.writeText(text)
  }


  ngOnInit() {
    const self = this;
    this.options.rowSelection = this.multiple ? 'multiple' : 'single';
    if (this.height) {
      this.options.getRowHeight = function () {
        return self.height;
      };
    }
    if (this.pagination !== null) {
      this.options.pagination = true;
      this.options.paginationPageSize = this.pagination;
      this.me.nativeElement.addClass('pagination');
    }
    var h = [];
    // var r = [];
    this.header.forEach((x: any) => {
      let id = null;
      let name = null;
      let cellRenderer = null;
      let width = null;
      if (typeof x === 'string') {
        name = x;
        id = this.camelize(x);
      } else if (typeof x === 'object') {
        if (Array.isArray(x)) {
          name = x[0];
          id = x[1];
          x[2] && (width = x[2]);
        } else {
          if (!x.name && !x.id && x.check) return;
          name = x.name;
          id = x.id ? x.id : this.camelize(x.name);
          x.cellRenderer && (cellRenderer = x.cellRenderer);
        }
      }
      var tmp: any = {
        headerName: name,
        field: id,
        filter: true,
        sortable: true,
        lockPosition: this.lockPosition,
        resizable: this.resizable,
      };
      if (typeof x === 'object' && !Array.isArray(x)) {
        x.check && (tmp.checkboxSelection = true);
        x.cellRenderer && (tmp.cellRenderer = x.cellRenderer);
        x.checkHeader && (tmp.headerCheckboxSelection = true);
        x.filter != undefined && (tmp.filter = x.filter);
        x.sortable != undefined && (tmp.sortable = x.sortable);
        x.lockPosition != undefined && (tmp.lockPosition = x.lockPosition);
        x.resizable != undefined && (tmp.resizable = x.resizable);
        x.width && (tmp.width = x.width);
      }
      this.width && (tmp.width = this.width);
      width && (tmp.width = width);
      h.push(tmp);
    });
    this.columnDefs = h;
  }
  private isVisible: boolean = false;
  ngAfterContentChecked(): void {
    if (this.isVisible == false && this.me.nativeElement.offsetParent != null) {
      this.isVisible = true;
      this.autoSizeAll();
      this.onshow && this.onshow(this);
    } else if (
      this.isVisible == true &&
      this.me.nativeElement.offsetParent == null
    ) {
      this.isVisible = false;
    }
  }
  onGridReady = (params: any) => {
    this.columnApi = params.columnApi;
    this.api = params.api;
    this.autoSizeAll();

    if (this.updateEnCola) {
      var data = this.updateEnCola;
      this.updateEnCola = null;
      this.update(data);
    }
    if (this.addEnCola) {
      var data = this.addEnCola;
      this.addEnCola = null;
      this.add(data);
    }
    this.onscrollend && this.createScrollEvent();
    this.onReady && this.onReady(this);
  };
  createScrollEvent() {
    var el: HTMLDivElement = this.me.nativeElement.find('.ag-body-viewport');
    el.onscroll = () => {
      if (el.scrollTop + el.offsetHeight >= el.scrollHeight) {
        this.onscrollend(this);
      }
    };
  }
  onSelectionChanged = () => {
    if (this.$seleccionada) {
      this.$seleccionada.removeClass('selected');
    }
    this.api.clientSideRowModel.rowsToDisplay.forEach(
      (x: RowNode, index: number) => {
        if (x.isSelected()) {
          var el = this.me.nativeElement.find(
            `.ag-center-cols-container .ag-row[row-index="${index}"]`
          );
          this.seleccionada = x;
          this.$seleccionada = el;
          el.addClass('selected');
        }
      }
    );
  };
  update = (data: Array<any>) => {
    if (!this.api && !this.api.rowData) {
      return (this.updateEnCola = data);
    }
    this.api.rowModel.setRowData(data);
    // this.columnApi.autoSizeAllColumns();
    this.autoSizeAll();
  };
  add = (data: Array<any>) => {
    if (!this.api && !this.api.rowData) {
      return (this.addEnCola = data);
    }
    const currentData: Array<any> = this.getData();
    this.update(currentData.concat(data));
    this.onchange && this.onchange(this.getData());
  };
  pdfExport() {
    const data: Array<any> = this.getData();
    const doc = new jsPDF("l", "pt");
    const headerData: Array<{
        name: string;
        id: string;
        cellRenderer: Function;
    }> = [];
    const head = [];
    this.header.forEach((x) => {
        if (x.export === false) return false;
        let name: string, id: string, cellRenderer: Function;
        if (typeof x === "string") {
            name = x;
            id = x.toLowerCase().replace(/ /g, "_");
        } else if (typeof x === "object") {
            if (Array.isArray(x)) {
                name = x[0];
                id = x[1];
            } else {
                name = x.name;
                id = x.id ? x.id : x.name.toLowerCase().replace(/ /g, "_");
                x.cellRenderer && (cellRenderer = x.cellRenderer);
            }
        }
        headerData.push({ name, id, cellRenderer });
        head.push(x.name);
    });
    doc["autoTable"]({
        head: [head],
        body: data.reduce((acum: any, item: any) => {
            const r = [];
            headerData.forEach((x) =>
                r.push(
                    x.cellRenderer
                        ? x.cellRenderer({ value: item[x.id] })
                        : item[x.id]
                )
            );
            acum.push(r);
            return acum;
        }, []),
    });
    doc.save(`${this.exportName}.pdf`);
  }
  autoSizeAll() {
    if (!this.autosize) return;
    this.columnApi && this.columnApi.autoSizeAllColumns();
    // this.columnApi && this.columnApi.sizeColumnsToFit();
  }
  clear = () => {
    this.api.rowModel.setRowData([]);
  };
  getData = (selected = false): any => {
    var resutls = [];
    this.api.clientSideRowModel.rowsToDisplay.forEach((x: RowNode) => {
      if (selected) {
        x.isSelected() && resutls.push(x.data);
      } else {
        resutls.push(x.data);
      }
    });
    if (selected && !resutls.length) {
      // TOAST.add("Debe seleccionar al menos un resultado");
      return false;
    }
    return resutls;
  };
  get(index: number) {
    const select = this.api.clientSideRowModel.rowsToDisplay[index];
    return select.data || false;
  }
  remove(data: any) {
    this.api.updateRowData({ remove: [data] });
    this.onchange && this.onchange(this.getData());
  }
  exist() {}
  getChecks = () => {
    if (this.select) {
      return this.seleccionada;
    }
    return this.getData(true);
  };
  setFilter = () => {
    this.api && this.api.setQuickFilter(this.filterValue);
  };
  unSelect() {
    this.api.deselectAll();
  }
  runExport() {
    // var params = {
    //     suppressQuotes: null,
    //     columnSeparator: null,
    //     customHeader: null,
    //     customFooter: null,
    // };
    this.api.exportDataAsCsv(/* params */);
  }
  loading(value: boolean) {
    if (value) {
      let $el = this.me.nativeElement
        .find('.wrap_custom_table')
        .addClass('loading');

      let el = $el.find(
        '.ag-body-viewport .ag-full-width-container'
      ) as HTMLDivElement;
      el.append(
        `<div class="wrap_loader_table"><span>Cargando</span><div class="loader_table"></div></div>`
      );
    } else {
      this.me.nativeElement
        .find('.wrap_custom_table')
        .removeClass('loading')
        .find('.wrap_loader_table')
        .remove();
    }
  }
  camelize = (str: string): string =>
    str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
}
