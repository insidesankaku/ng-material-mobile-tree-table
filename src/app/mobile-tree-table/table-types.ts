export const isRowHeader = <R, H>(m: any): m is RowHeader<R, H> => m.rowHeader && Array.isArray(m.children)

export type TreeTable<R, H> = | R | RowHeader<R, H> | RowHeader<RowHeader<R, H>, H>

export interface TableElement {
    readonly _parent: TableElement;
    readonly _isRowHeader: boolean;
    readonly _levelOfDepth: number;
    _children: TableElement[];
    [property: string]: any;
}

export interface StaticRowHeader {
    title: string;
    value: number | string;
}

export interface RowHeader<R, H> {
    rowHeader: H;
    children: R[]
}



