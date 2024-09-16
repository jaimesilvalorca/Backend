import {getAge} from '../../src/plugins/get-age.plugin'



describe('plugins/get-age.plugin.ts',()=>{
    test('getAge() shoueld return the age of a person',()=>{

        const birthdate = '1985-10-21'
        const age = getAge(birthdate)

        expect(typeof age).toBe('number')
    })

    test('getAge should return current age',()=>{
        const birthdate = '1985-10-21'
        const age = getAge(birthdate)

        const calculatedAge = new Date().getFullYear() - new Date(birthdate).getFullYear()

        expect(age).toBe(calculatedAge)
    })

    test('getAge should return 0 years',()=>{

        const spy = jest.spyOn(Date.prototype,'getFullYear').mockReturnValue(1995)

        const brithdate = '1995-10-21'
        const age = getAge(brithdate)

        expect(age).toBe(0)

    })
})