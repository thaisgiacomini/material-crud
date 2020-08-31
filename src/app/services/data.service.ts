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
    console.log(this.dialogData);
  }
  addItem(issue: Issue): void {
    this.httpClient.post(this.API_URL, issue).subscribe(data => {
      this.dialogData = data;
      this.issue = this.dialogData;

      console.log(this.dialogData);
    },
      (err: HttpErrorResponse) => {
        console.log('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      });
  }
  // addIssue(issue: Issue): void {

  //   this.httpClient.post(this.API_URL, issue, this.httpOptions).subscribe(data => {
  //     this.dialogData = issue;
  //     console.log(this.dialogData);

  //     alert('Successfully added');
  //   },
  //     (err: HttpErrorResponse) => {
  //       console.log('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
  //     });

  // }
  // addIssue(issue: Issue): void {
  //   this.httpClient.post(this.API_URL, issue, this.httpOptions).subscribe(data => {
  //     this.dialogData = issue;
  //     console.log(this.dialogData);

  //     alert('Successfully added');
  //   },
  //     (err: HttpErrorResponse) => {
  //       console.log('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
  //     });
  // }

  updateIssue(issue: Issue): void {
    this.dialogData = issue;
  }
  updateItem(issue: Issue): void {
    this.httpClient.put(this.API_URL + issue._id, issue).subscribe(data => {
      this.dialogData = data;
      this.issue = this.dialogData;

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

/* REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:

    // ADD, POST METHOD
    addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }

    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/
