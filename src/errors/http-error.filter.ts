import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as fs from 'fs';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const now = new Date().toLocaleString();
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();
    const query = JSON.stringify(req.query);
    const body = JSON.stringify(req.body);
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.NOT_FOUND;
    const log = `${now} Code: ${status} ${req.method} ${req.url} Query: ${query} Body: ${body}`;

    const errorResponse = {
      code: status,
      timestamp: now,
      path: req.url,
      method: req.method,
      message:
        status !== HttpStatus.NOT_FOUND
          ? exception.message || null
          : 'Not Found',
    };

    fs.appendFileSync('./logging.log', `\n${log} \n${exception.stack}`);

    Logger.error(log, exception.stack, 'ExceptionFilter');

    res.status(status).json(errorResponse);
  }
}
