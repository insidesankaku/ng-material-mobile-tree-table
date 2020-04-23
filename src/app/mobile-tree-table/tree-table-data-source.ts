import { TableElement, isRowHeader, TreeTable } from './table-types';

export class TreeTableDataSource {
  static flatten<R, H>(nodes: TreeTable<R, H>[], parentNode?: TableElement, levelOfDepth: number = 0) {
        const flatData = [];

        nodes.forEach(node => {
            const convertedNode = this.convert(node, parentNode, levelOfDepth);

            if (isRowHeader(node)) {
                convertedNode._children = this.flatten(node.children, convertedNode, levelOfDepth + 1);

                flatData.push(...convertedNode._children);
            }

            flatData.push(convertedNode);
        });

        return flatData;
    }


    private static convert<R, H>(node:  H | TreeTable<R, H>, parentNode: TableElement, levelOfDepth: number): TableElement {
        const data = isRowHeader(node) ? node.rowHeader : node;

        return {
            ...data,
            _parent: parentNode,
            _children: [],
            _levelOfDepth: levelOfDepth,
            _isRowHeader: isRowHeader(node),
        }
    }
}