console.clear();
import { defer, of, timer, merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// https://www.learnrxjs.io/learn-rxjs/operators/creation/defer

// Example 1: Defer to get current date/time at the time of subscription
const s1 = of(new Date()); //will capture current date time
const s2 = defer(() => of([new Date(), 'defer'])); //will capture date time at the moment of subscription

console.log(new Date());

timer(2000)
  .pipe(switchMap((_) => merge(s1, s2)))
  .subscribe(console.log);

/*
OUTPUT => 
2019-02-10T12:38:30.000Z (current date/time from first console log)
2019-02-10T12:38:30.000Z (date/time in s1 console log, captured date/time at the moment of observable creation)
2019-02-10T12:38:32.000Z (date/time in s2 console log, captured date/time at the moment of subscription)
*/

/*//NOTE: 'traditional' js equivalent of timer code above is:
setTimeout(() => {
  s1.subscribe(console.log);
  s2.subscribe(console.log);
}, 2000);
*/
