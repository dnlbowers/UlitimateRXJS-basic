import {Observable} from 'rxjs';

const observer = {
    next: value => console.log('next', value),
    error: err => console.log("error", err),
    complete: () => console.log("complete")
}

const observable = new Observable(subscriber => {
    let count = 0;

    const id = setInterval(() => {
        subscriber.next(count);
        count += 1;
    }, 1000);

    return () => {
        console.log("called");
        clearInterval(id);
    };
});
console.log("before");
const subscription = observable.subscribe(
    observer
)

const subscriptionTwo = observable.subscribe(
    observer
)

subscription.add(subscriptionTwo);

setTimeout(() => {
    subscription.unsubscribe();
}, 3500);
console.log("after");