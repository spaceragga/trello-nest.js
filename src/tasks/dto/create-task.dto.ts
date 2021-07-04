export class CreateTaskDto {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  toResponse: () => void;
}
