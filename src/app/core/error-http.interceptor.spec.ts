import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable, of, throwError } from 'rxjs';

import { ErrorHttpInterceptor } from './error-http.interceptor';

describe('ErrorHttpInterceptor', () => {
  let interceptor: ErrorHttpInterceptor;
  let toastSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const toastSpyObj = jasmine.createSpyObj('MatSnackBar', ['open']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [
        ErrorHttpInterceptor,
        { provide: MatSnackBar, useValue: toastSpyObj }
      ]
    });
    interceptor = TestBed.inject(ErrorHttpInterceptor);
    toastSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should handle HTTP errors', () => {
    const errorResponse = new HttpErrorResponse({ status: 404, statusText: 'Not Found' });
    const next: HttpHandler = {
      handle: (request: HttpRequest<any>): Observable<HttpEvent<any>> => {
        return throwError(errorResponse);
      }
    };

    interceptor.intercept(new HttpRequest<any>('GET', '/api/data'), next).subscribe(
      () => {},
      (error: HttpErrorResponse) => {
        expect(error).toBe(errorResponse);
        expect(toastSpy.open).toHaveBeenCalledWith('Status: 404 The url you requested does not exist. Please try again later', 'Dismiss', Object({ duration: 5000, verticalPosition: 'top' }));
      }
    );
  });

  it('should pass through non-error responses', () => {
    const responseEvent = {} as HttpEvent<any>;
    const next: HttpHandler = {
      handle: (request: HttpRequest<any>): Observable<HttpEvent<any>> => {
        return of(responseEvent);
      }
    };

    interceptor.intercept(new HttpRequest<any>('GET', '/api/data'), next).subscribe(
      (event: HttpEvent<any>) => {
        expect(event).toBe(responseEvent);
        expect(toastSpy.open).not.toHaveBeenCalled();
      }
    );
  });
});
