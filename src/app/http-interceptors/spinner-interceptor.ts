import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

    count = 0;

    constructor(private spinner: NgxSpinnerService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!(req.url.indexOf('Video/GetVideoByIdAndResolution') > -1) && !(req.url.indexOf('Video/TestConnection') > -1)) {
            this.spinner.show()
            this.count++;
        } else {
            return next.handle(req)
                .pipe(tap(),
                    finalize(() => {
                    })
                );
        }

        return next.handle(req)
            .pipe(tap(),
                finalize(() => {
                    this.count--;
                    if (this.count == 0) this.spinner.hide()
                })
            );
    }
}