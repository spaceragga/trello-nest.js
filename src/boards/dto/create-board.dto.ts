import { IColumn } from "../interfaces/column.interface"

export class CreateBoardDto {
    id: string;

    title: string;

    columns: IColumn[];

    toResponse: (board) => void;
}
