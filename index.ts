import { Observable, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';

const source$ = new Observable((subscriber) => {
  setTimeout(() => subscriber.next('A'), 2000);
  setTimeout(() => subscriber.next('B'), 5000);
});

console.log('App has started');
source$
  .pipe(
    //
    concatMap((value) => of(1, 2))
  )
  .subscribe((value) => console.log(value));

/* Explanation:

    So in our case, concatMap's logic will subscribe to the Observable created using the 'of' function, over

here.

The values emitted by this inner Subscription to this inner Observable will then be flattened to

the output.

So our Observer will just receive those two next notifications with values '1' and '2' without knowing

that there were some additional Subscriptions happening above.

And later on, after three more seconds, value 'B' will be emitted by the source and this next notification

will, once again, reach the concatMap's logic, which will again call the function over here and create

an inner Subscription to the returned 'of' Observable. And once again, the emitted values

'1' and '2' will be handled by the concatMap's logic, which will reemit them to the output.

As a side note, you may have noticed that we don't use the value emitted by the source Observable,

and this is to keep things as simple as possible in this example.
*/
