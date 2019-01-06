import {BehaviorSubject, Observable} from "rxjs";

/*
 * A generic observable container
 */

export class Store<T> {

    protected data: BehaviorSubject<T>
    value$: Observable<T>

    constructor(initialState: T) {
        this.data = new BehaviorSubject<T>(initialState)
        this.value$ = this.data.asObservable()
    }

    snapshot(): T {
        return this.data.getValue()
    }

    set(newValue: T): void {
        this.data.next(newValue)
    }

    update(mapper: (T) => T): void {
        this.data.next(mapper(this.data.value))
    }
}

/*
 * A generic observable collection
 */

export class StoreCollection<T> extends Store<T[]> {

    prepend(item: T): void {
        this.data.next([item, ...this.data.value])
    }

    append(item: T): void {
        this.data.next([...this.data.value, item])
    }

    filter(filter?: (T) => boolean): void {
        this.data.next(this.data.value.filter(filter))
    }

    remove(item: T): T {
        if (this.data.value.includes(item)) {
            this.data.next(this.data.value.filter(i => i !== item))
            return item
        } else {
            return null
        }
    }

    map(mapper: (T) => T, filter?: (T) => boolean): void {
        this.data.next(this.data.value.map(item => filter && filter(item) === false ? item : mapper(item)))
    }

    clear() {
        this.data.next([])
    }
}
