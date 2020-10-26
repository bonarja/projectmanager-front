interface Menu {
    name: string;
    action: Function;
}

interface Options {
    activator: string | any;
    menuList: Array<Menu>;
    selectorClass?: string;
    wrapStyle?: {[key: string]: string | number};
    menuStyle?: {[key: string]: string | number};
    itemStyle?: {[key: string]: string | number};
    itemHover?: {[key: string]: string | number};
}

const Styles: {[key: string]: {[key: string]: string | number}} = {
    menu: {
        position: "absolute",
        zIndex : 99999999,
        width: "230px",
        backgroundColor: "rgba(255, 255, 255, 0.98)",
        boxShadow: "0px 0px 39px -13px rgba(0,0,0,0.75)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        borderRadius: "4px",
        padding: "15px 0",
    },
    item: {
        padding: "10px 15px",
        fontWeight: 600,
        color: "#6d6d6d"
    },
    itemHover: {
        color: "white",
        backgroundColor: "#ababab"
    },
    wrap: {
        width: "100%",
        height: "100%",
        position: "fixed",
        zIndex: 9999999,
        left: 0,
        top: 0,
    }
}

export class MenuItem {
    private body: HTMLElement;
    private options: Options;
    private wrap: HTMLDivElement;
    private id: string;
    private hoverStyle: string = "";
    private FocusElement: HTMLElement;
    constructor(opt: Options) {
        this.body = document.querySelector("body");
        this.id = Math.random().toString(36).substr(2, 10);
        this.options = {
            activator: typeof opt.activator === "string" ? 
                document.querySelector(opt.activator) : 
                opt.activator,
            menuList: opt.menuList,
            selectorClass: opt.selectorClass,
            menuStyle: opt.menuStyle || {},
            itemStyle: opt.itemStyle || {},
            wrapStyle: opt.wrapStyle || {},
            itemHover: opt.itemHover || {},
        };

        this.options.itemHover = Object.assign(Styles.itemHover, this.options.itemHover);

        if (Object.entries(this.options.itemHover)) {
            this.hoverStyle = this.jsonToStyle(this.options.itemHover);
        }

        this.bind(this.options.activator);
    }
    private createItem(menu: Menu) {
        const item = document.createElement("div");
        Object.assign(item.style, Styles.item, this.options.itemStyle);
        item.classList.add(`item_${this.id}`);
        item.innerHTML = menu.name;

        item.onclick = () => {
            this.close();
            menu.action(this.FocusElement);
        }

        return item;
    }

    private jsonToStyle(json: {[key: string]: string | number}) : string {

        const regex = (str: string, re: RegExp, callback: Function) => {
            var grupos: Array<any>; 
            while ((grupos = re.exec(str)) !== null) { 
                callback(grupos[0][0])
            }
        }


        var result: string = "{";
        Object.entries(json).forEach((x: any) => {
            var key = x[0];
            var value = x[1];
            regex(key, /[A-Z]/g, (val: string) => {
                key = key.replace(val, `-${val.toLowerCase()}`);
            })
            result += `${key}:${value.replace(/"/g, "")} !important;`;
        })
        result += "}"
        return result;
    }

    private close() {
        if (!this.wrap) return;
        this.wrap.remove();
        this.wrap = null;
    }

    private create(x: number, y: number) {

        this.wrap = document.createElement("div");
        Object.assign(this.wrap.style, Styles.wrap, this.options.wrapStyle)

        this.wrap.innerHTML = `
            <style>
                .item_${this.id}:hover ${this.hoverStyle}
            </style>
        `


        this.wrap.onclick = (e) => {
            e.target === this.wrap && this.close();
        }
        this.wrap.oncontextmenu = (e) => {
            e.target === this.wrap && this.close();
            return true;
        }

        const menu = document.createElement("div");
        menu.classList.add(`menu_${this.id}`);
        menu.style.visibility = "hidden";
        Object.assign(menu.style, Styles.menu, this.options.menuStyle);
        menu.style.top = `${y}px`;
        menu.style.left = `${x}px`;

        this.wrap.appendChild(menu);

        this.options.menuList.forEach((x: Menu) => {
            menu.appendChild(this.createItem(x))
        })

        this.body.appendChild(this.wrap);
    }

    private bind(element: HTMLElement) {
        element.oncontextmenu = (e) => {

            if (this.options.selectorClass) {
                if (!(e.target as HTMLElement).classList.contains(this.options.selectorClass)) {
                    return false;
                }
            }

            this.FocusElement = e.target as HTMLElement;
            let x = e.pageX;
            let y = e.pageY;

            this.create(x, y);
            var menu: HTMLElement = this.wrap.querySelector(`.menu_${this.id}`);

            if (x + menu.offsetWidth > this.body.offsetWidth) {
                x = this.body.offsetWidth - menu.offsetWidth - 30;
                menu.style.left = `${x}px`;
            }

            
            if (y + menu.offsetHeight > this.body.offsetHeight) {
                y = this.body.offsetHeight - menu.offsetHeight - 30;
                menu.style.top = `${y}px`;
            }

            // show
            menu.style.visibility = "unset";


            return false;
        }
    }
}   