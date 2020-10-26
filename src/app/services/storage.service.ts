// Bonarja Simple Storage
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
})
export class Storage {
    set(item: string, value: any): any {
        return localStorage.setItem(
            item,
            JSON.stringify({ type: typeof value, value })
        );
    }
    get(item: string): any {
        var object: any = localStorage.getItem(item);
        try {
            object = JSON.parse(object);
        } catch (error) {}

        if (object === null) return null;
        if (typeof object !== 'object') return object;
        if (object.type === 'number') return Number(object.value);
        if (object.type === 'string') return String(object.value);
        return object.value;
    }
}
