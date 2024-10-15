// claim.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ClaimsService } from '../../services/claims.service';
import {
  loadClaims,
  loadClaimsSuccess,
  loadClaimsFailure,
  updateClaim,
  updateClaimSuccess,
  updateClaimFailure,
  deleteClaim,
  deleteClaimSuccess,
  deleteClaimFailure,
  addClaim,
  addClaimSuccess,
  addClaimFailure,
} from '../actions/claim.actions';

@Injectable()
export class ClaimEffects {
  constructor(private actions$: Actions, private claimsService: ClaimsService) {}

  loadClaims$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadClaims),
      mergeMap(() =>
        this.claimsService.getClaims().pipe(
            // tap(claims => console.log('Claims fetched:', claims)), // Log claims here
          map(claims => loadClaimsSuccess({ claims })),
          catchError(error => of(loadClaimsFailure({ error: error.message })))
        )
      )
    )
  );


  updateClaim$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateClaim),
      mergeMap(action =>
        this.claimsService.updateClaim(action.claim).pipe(
          map(claim => updateClaimSuccess({ claim })),
          catchError(error => of(updateClaimFailure({ error: error.message })))
        )
      )
    )
  );

  deleteClaim$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteClaim),
      mergeMap(action =>
        this.claimsService.deleteClaim(action.claimId).pipe(
          map(() => deleteClaimSuccess({ claimId: action.claimId })),
          catchError(error => of(deleteClaimFailure({ error: error.message })))
        )
      )
    )
  );

  addClaim$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addClaim),
      mergeMap(action =>
        this.claimsService.addClaim(action.claim).pipe(
          map(claim => addClaimSuccess({ claim })),
          catchError(error => of(addClaimFailure({ error: error.message })))
        )
      )
    )
  );
}
