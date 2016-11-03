/* @flow */


import { NameBuilder, PersonBuilder } from './fluent';



describe('fluent', () => {
    describe('name', () => {
        it('should create a empty name object', () => {

            const n = new NameBuilder();

            expect(n.valueOf()).toEqual({
                givenName: '',
                surname: '',
            });
        });

        it('should set first name to bob', () => {
            const n = new NameBuilder();

            expect(n.withGivenName('bob').valueOf()).toEqual({
                givenName: 'bob',
                surname: '',
            });
        });
    });

    describe('person', () => {
        it('should out the name', () => {
            const p = new PersonBuilder();

            expect(p.named(new NameBuilder().withGivenName('bob').withSurname('smith')).valueOf()).toEqual({
                name: {
                    givenName: 'bob',
                    surname: 'smith',
                }
            })
        });
    })
});
