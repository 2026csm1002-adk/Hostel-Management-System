export class AppError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.name = new.target.name;
    this.status = status;
  }
}
export class NotFoundError extends AppError {
  constructor(message = "Not found") { super(message, 404); }
}
export class ForbiddenError extends AppError {
  constructor(message = "You do not have access to this") { super(message, 403); }
}
export class ValidationError extends AppError {
  constructor(message = "Invalid input") { super(message, 400); }
}
export class ConflictError extends AppError {
  constructor(message = "Conflict") { super(message, 409); }
}
export class NotImplementedError extends AppError {
  constructor(message = "Not implemented yet") { super(message, 501); }
}
