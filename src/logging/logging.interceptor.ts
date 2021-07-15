import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  Logger,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as fs from 'fs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = new Date().toLocaleString();
    const req = context.switchToHttp().getRequest();
    const query = JSON.stringify(req.query);
    const body = JSON.stringify(req.body);
    const status = context.switchToHttp().getResponse().statusCode;
    const log = `${now} Code: ${status} ${req.method} ${req.url} Query: ${query} Body: ${body}`;

    fs.appendFileSync('./logging.log', `\n${log}`);

    return next
      .handle()
      .pipe(tap(() => Logger.log(log, context.getClass().name)));
  }
}
