import HttpException from "./HttpException";
 
class InvalidCredentialsException extends HttpException {
  constructor() {
    super(404, `Invalid Credentials`);
  }
}
 
export default InvalidCredentialsException;
