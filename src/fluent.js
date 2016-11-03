/* @flow */

export type Name = {
    givenName: string;
    surname: string;
}

export type Address = {

}

export type Person = {
    name: Name;
    age: number;

    job: string;
    address: Address;
}


/**
 * @gneric {Object} T Real Object Type Represented by this builder
 * @generic {Object} B Builder Type Used by this builder
 *                      normally the same as T, optionally with object types substituted for builders
 */
class FluentBuilder<T: Object, B: $Subtype<{[_: $Keys<T>]: any}>> {
    static initialObj: B;
    obj: B;

    /**
     * @param {FluentBuilder<T,B>} obj Full object or a FluentBuilder of the same type
     * @param {Shape<T>} [newObj] Properties to replace on obj
     */
    constructor(obj?: T | FluentBuilder<T, B>, newObj?: $Shape<B>) {
        if (obj instanceof FluentBuilder) {
            this.obj = { ...this.constructor.initialObj, ...obj.valueOf(), ...newObj };
        } else {
            this.obj = { ...this.constructor.initialObj };
        }
    }

    valueOf<T>() {
        const out = {};

        for (let k of Object.keys(this.obj)) {
            if (typeof k !== 'function') {
                if (this.obj[k] instanceof FluentBuilder) {
                    out[k] = this.obj[k].valueOf()
                } else {
                    out[k] = this.obj[k];
                }
            }
        }

        return out;
    }
}


export class NameBuilder extends FluentBuilder<Name, Name> {
    static initialObj = {
        givenName: '',
        surname: '',
    };

    withGivenName(givenName: string): NameBuilder {
        return new NameBuilder(this, { givenName });
    }

    withSurname(surname: string): NameBuilder {
        return new NameBuilder(this, { surname });
    }

}


type PersonBuilderType = {
    name: NameBuilder;
    age: number;
    job: string;
    address: FluentBuilder<Address, Address>;
};

export class PersonBuilder extends FluentBuilder<Person, PersonBuilderType> {

    named(name: NameBuilder): PersonBuilder {
        return new PersonBuilder(this, { name });
    }
}
