export interface ICustomHttpException {
  statusCode: number;
  message: string;
}

class CustomHttpException extends Error implements ICustomHttpException {

  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode;
  }

}

export default CustomHttpException;