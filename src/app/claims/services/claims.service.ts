// claims.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Claim } from '../models/claim.model';

@Injectable({
  providedIn: 'root',
})
export class ClaimsService {
  private apiUrl = 'http://localhost:3000/claims'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  getClaims(): Observable<Claim[]> {
    return this.http.get<Claim[]>(this.apiUrl).pipe(
      tap(claims => console.log('Claims fetched:', claims)) // Log the claims
    );
  }

  updateClaim(claim: Claim): Observable<Claim> {
    return this.http.put<Claim>(`${this.apiUrl}/${claim.id}`, claim);
  }

  deleteClaim(claimId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${claimId}`);
  }

  addClaim(claim: Claim): Observable<Claim> {
    return this.http.post<Claim>(this.apiUrl, claim);
  }
}
