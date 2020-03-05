/**
 * Represents a value that can either be null or have a value.
 */
export type Nullable<T> = T | null;

/**
 * Checks to see if the nullable value is not or not.
 * @param value the nullable value to check if it is null or not.
 * @returns True if is not null; otherwise, false.
 */
export function hasValue<T>(value: Nullable<T>): boolean {
    if (!value) {
        return false;
    }

    return true;
}

/**
 * Gets the actual value of the nullable value. This assumes that it is no null.
 * @param value The nullable value we need to get the actual value out of
 * @returns the actual value of the nullable value.
 */
export function getValue<T>(value: Nullable<T>): T {
    if (!hasValue(value)) {
        throw new Error('Can not access value of null object');
    }

    // we checked above that the value is not null.
    // eslint-disable-next-line
    return value!;
}

