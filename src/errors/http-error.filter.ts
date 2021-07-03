import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    // Logger,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
//   import { Request, Response } from 'express';
  
  @Catch()
  export class HttpErrorFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
      const status = exception.getStatus
        ? exception.getStatus()
        : HttpStatus.NOT_FOUND;
  
      const errorResponse = {
        code: status,
        timestamp: new Date().toLocaleDateString(),
        path: request.url,
        method: request.method,
        message:
          status !== HttpStatus.NOT_FOUND
            ? exception.message || null
            : 'Not Found',
      };

      response.status(status).json(errorResponse);
    }
  }