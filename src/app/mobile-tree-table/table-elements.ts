import { TableElement } from './table-types';

export class TableElements {
    private readonly _elements: TableElement[];
    private readonly _parent: TableElement;

    get elements(): TableElement[] {
        return this._elements;
    }

    get parent(): TableElement {
        return this._parent;
    }

    constructor(elements: TableElement[], parent: TableElement) {
        this._elements = elements;
        this._parent = parent;
    }
    
    public isRowHeader(): boolean {
        return this._elements[0]?._isRowHeader;
    }

    public getParent(): TableElement { 
        const [element] = this._elements;

        return element?._parent?._parent;
    }

    public getLength(): number {
        return this._elements.length;
    }
}
