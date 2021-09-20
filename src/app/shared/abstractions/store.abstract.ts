import { BehaviorSubject, Observable } from 'rxjs';

import { filter } from 'rxjs/operators';

/**
 * Base class for every store service created in a feature module
 * Purpose: generalize init and subscription
 * Purpose: create common signature for every store
 */
export default abstract class AbstractStore<T> {
  /**
   * Private subject - public observable pattern
   * Provides a public observable to the relevant views
   * While keeping subject itself private, so that .next() can be called only from within service
   * BehaviorSubject in order to hold last and initial value
   */
  protected storeSubject: BehaviorSubject<T>;

  protected store: Observable<T>;

  constructor() {
    this.storeSubject = new BehaviorSubject<T>(null!); // ToDo: strict complains without non-null assertion operator
    this.store = this.storeSubject.asObservable().pipe(filter((initialStore) => !!initialStore));
  }

  /**
   * Shared implementation for public subscription
   * @TODO - consider different naming or restrict modifier for this.config
   */
  connect(): Observable<T> {
    return this.store;
  }

  /**
   * Provides a common way of store initialization and first value emit
   * @param ...args - might contain any number of arguments, buildStore() method implementation have to handle this respectively
   */
  init(...args: any): void {
    this.buildStore(args).subscribe(
      (store) => {
        this.storeSubject.next(store);
      },
      (error) => console.error(error)
    );
  }

  /**
   * Reset the store subject
   */
  reset(): void {
    this.storeSubject.next(null!); // ToDo: strict complains without non-null assertion operator
  }

  /**
   * To implement exact initialization build logic
   * @param ...args - might contain any arguments, method implementation have to handle this respectively
   */
  protected abstract buildStore(..._args: any): Observable<T>;

  /*
  protected getStoreCopy(): T {
    return cloneDeep(this.storeSubject.value) as T;
  }
  */

  protected publish(storeCopy: T) {
    this.storeSubject.next(storeCopy);
  }
}
