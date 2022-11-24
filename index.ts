import { Observable, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';

const source$ = new Observable((subscriber) => {
  setTimeout(() => subscriber.next('A'), 2000);
  setTimeout(() => subscriber.next('B'), 5000);
});

console.log('App has started');
source$
  .pipe(
    //emit the values from another observable into this observable
    concatMap((value) => of(1, 2))
  )
  .subscribe((value) => console.log(value));
