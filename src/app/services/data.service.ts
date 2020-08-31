import { Injectable } from "@angular/core";
import { Issue } from "../models/issue";
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable()
export class DataService {
  private readonly API_URL = "https://agdo-server.appspot.com/solicitacoes/";

  dataChange: BehaviorSubject<Issue[]> = new BehaviorSubject<Issue[]>([]);
  dialogData: any;
  issue: any;


  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  get data(): Issue[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllIssues(): void {
    this.httpClient.get<Issue[]>(this.API_URL).subscribe(
      (data) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }

  addIssue(issue: Issue): void {
    this.dialogData = issue;
  }
  addItem(issue: Issue): void {
    this.httpClient.post(this.API_URL, issue, this.httpOptions).subscribe(data => {
      console.log(data)
      this.dialogData = data;
      this.issue = this.dialogData;

    },
      (err: HttpErrorResponse) => {
        console.log('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      });
  }


  // updateIssue(issue: Issue): void {
  //   this.dialogData = issue;
  // }
  updateIssue(issue: Issue): void {
    this.httpClient.put(this.API_URL + issue._id, issue).subscribe(data => {
      this.dialogData = issue;
    },
      (err: HttpErrorResponse) => {
        console.log('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  deleteIssue(_id: number): void {
    this.httpClient.delete(this.API_URL + _id).subscribe(data => {
    },
      (err: HttpErrorResponse) => {
        console.log('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
