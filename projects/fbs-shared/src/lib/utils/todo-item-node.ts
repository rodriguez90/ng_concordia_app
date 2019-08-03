/**
 * Node for to-do item
 */
export class TodoItemNode {
    id: any;
    children: TodoItemNode[];
    item: string;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
    id: any;
    item: string;
    level: number;
    expandable: boolean;
}