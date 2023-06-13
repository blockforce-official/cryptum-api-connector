import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class CryptumExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    let message = exception.message;
    
    if (exception.getResponse) {
      const response = exception.getResponse() as any;
      message = Array.isArray(response.message) ? response.message[0] : response.message;
    }
    const responseBody = {
      statusCode: httpStatus,
      message,
      error: exception.name,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
