import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpProgressEvent, HttpRequest} from "@angular/common/http";
import {Store, StoreCollection} from "../../util/Store";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {UploadedFile} from "../../../../../common/interfaces/upload";

export interface Report {
  filename: string;
  size: number;
  status: number | 'done' | 'error'; //number: uploading status in percent
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  acceptedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  acceptPattern = 'image/*';
  url = '/api/upload';

  reports: StoreCollection<Store<Report>> = new StoreCollection<Store<Report>>([]);

  constructor(private http: HttpClient) {
  }

  uploadFiles(files: File[]): Observable<UploadedFile> {

    const uploadedFiles = new Subject<UploadedFile>();
    let processedFiles = 0;

    const completeIfNoMoreFiles = () => {
      processedFiles++;
      if (processedFiles >= files.length) {
        uploadedFiles.complete();
      }
    };

    if (
      files && files.length
      && files.every(file => this.acceptedFileTypes.indexOf(file.type) !== -1)
    ) {
      files.forEach((file, index) => {
        console.log('Uploading ' + file.name);

        const report: Store<Report> = new Store<Report>({
          filename: file.name,
          size: file.size,
          status: 0
        });
        this.reports.append(report);

        const formData = new FormData();
        formData.append(`uploadedfile`, file, file.name);

        this.http.request<any>(new HttpRequest(
          "POST",
          this.url,
          formData,
          {reportProgress: true}
        )).subscribe((event: HttpEvent<UploadedFile>) => {
          if (event.type === HttpEventType.UploadProgress) {
            const e = event as HttpProgressEvent;
            report.update(r => ({
              ...r,
              status: e.loaded / e.total
            }));
          }
          if (event.type === HttpEventType.Response) {
            console.log('Upload complete', event);
            report.update(r => ({
              ...r,
              status: 'done'
            }));
            setTimeout(() => {
              this.reports.remove(report);
            }, 3000);

            uploadedFiles.next(event.body);

            completeIfNoMoreFiles();
          }
        }, (error) => {
          console.error('Upload error', error);
          report.update(r => ({
            ...r,
            status: 'error'
          }));
          setTimeout(() => {
            this.reports.remove(report);
          }, 3000);

          completeIfNoMoreFiles();
        });
      });
    } else {
      completeIfNoMoreFiles();
    }

    return uploadedFiles.asObservable();
  }
}
