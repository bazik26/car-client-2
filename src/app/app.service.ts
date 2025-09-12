import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public API_URL = environment.API_URL;

  constructor(protected readonly http: HttpClient) {}

  getAllBrandsAndModels(): Observable<any> {
    return this.http
      .get(`${this.API_URL}/cars/all-brands-and-models`)
      .pipe(map((response) => response));
  }

  getBrandsAndModelsWithCount(): Observable<any> {
    return this.http
      .get(`${this.API_URL}/cars/brands-and-models-with-count`)
      .pipe(map((response) => response));
  }

  getCars(params?: any): Observable<any> {
    let url = `${this.API_URL}/cars`;
    
    if (params) {
      const queryParams = new URLSearchParams();
      
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
      if (params.random) queryParams.append('random', 'true');
      
      if (queryParams.toString()) {
        url += `?${queryParams.toString()}`;
      }
    }
    
    return this.http
      .get(url)
      .pipe(map((response) => response));
  }

  searchCars(payload: any): Observable<any> {
    return this.http
      .post(`${this.API_URL}/cars/search`, payload)
      .pipe(map((response) => response));
  }

  getCarsAll(): Observable<any> {
    return this.http
      .get(`${this.API_URL}/cars/all`)
      .pipe(map((response) => response));
  }

  createCar(car: any): Observable<any> {
    return this.http
      .post(`${this.API_URL}/cars/car`, car)
      .pipe(map((response) => response));
  }

  getCar(carId: number): Observable<any> {
    return this.http
      .get(`${this.API_URL}/cars/car/${carId}`)
      .pipe(map((response) => response));
  }

  updateCar(carId: number, car: any): Observable<any> {
    delete car.files;

    return this.http
      .patch(`${this.API_URL}/cars/car/${carId}`, car)
      .pipe(map((response) => response));
  }

  uploadCarImages(carId: number, files: File[]): Observable<any> {
    const form = new FormData();
    files
      .filter((file): file is File => !!file)
      .filter((file: any) => !file.id)
      .forEach((file) => form.append('images', file, file.name));

    return this.http.patch<any>(
      `${this.API_URL}/cars/car/${carId}/images`,
      form,
    );
  }

  deleteCarImage(carId: number, fileId: number): Observable<any> {
    return this.http
      .delete(`${this.API_URL}/cars/car/${carId}/images/image/${fileId}`)
      .pipe(map((response) => response));
  }

  deleteCar(carId: number): Observable<any> {
    return this.http
      .delete(`${this.API_URL}/cars/car/${carId}`)
      .pipe(map((response) => response));
  }

  restoreCar(carId: number): Observable<any> {
    return this.http
      .get(`${this.API_URL}/cars/car/${carId}/restore`)
      .pipe(map((response) => response));
  }

  auth(): Observable<any> {
    return this.http
      .get(`${this.API_URL}/auth`)
      .pipe(map((response) => response));
  }

  signin(payload: any): Observable<any> {
    return this.http
      .post(`${this.API_URL}/auth/signin`, payload)
      .pipe(map((response) => response));
  }

  getAdminsAll(): Observable<any> {
    return this.http
      .get(`${this.API_URL}/admins/all`)
      .pipe(map((response) => response));
  }

  createAdmin(admin: any): Observable<any> {
    return this.http
      .post(`${this.API_URL}/admins/admin`, admin)
      .pipe(map((response) => response));
  }

  deleteAdmin(adminId: number): Observable<any> {
    return this.http
      .delete(`${this.API_URL}/admins/admin/${adminId}`)
      .pipe(map((response) => response));
  }

  restoreAdmin(adminId: number): Observable<any> {
    return this.http
      .get(`${this.API_URL}/admins/admin/${adminId}/restore`)
      .pipe(map((response) => response));
  }

  getFileUrl(image: any) {
    if (!image || !image.path) {
      console.warn('Image object is missing or has no path:', image);
      return '';
    }
    
    const url = image.path.startsWith('http') ? image.path : `${this.API_URL}/${image.path}`;
    console.log('Generated image URL:', url);
    return url;
  }
  contactUs(payload: any) {
    return this.http
      .post(`${this.API_URL}/contact-us`, payload)
      .pipe(map((response) => response));
  }
}
