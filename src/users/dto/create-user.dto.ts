export class CreateUserDto {
    id: string;

    name: string;

    login: string;

    password: string;

    toResponse: (user) => void;
}
