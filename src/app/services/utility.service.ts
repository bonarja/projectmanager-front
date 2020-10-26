// Bonarja Simple Storage
import { ElementRef, Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
})
export class Utility {
    getForm(reference: ElementRef, select?: string) {
        const form = {};
        reference.nativeElement
            .querySelectorAll(`${select ? select : ''}input`)
            .forEach((x: HTMLInputElement) => {
                form[x.name] = x.name.includes('pass')
                    ? x.value
                    : x.value.trim();
            });
        return form;
    }
}
