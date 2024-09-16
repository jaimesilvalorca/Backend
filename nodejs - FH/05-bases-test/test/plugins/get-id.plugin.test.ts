import {getUUID} from '../../src/plugins/get-id.plugin'

describe('plugins/get-id.plugin.ts',()=>{

    test('should be return a string and 36',()=>{
        const uuid = getUUID()
    
        expect(typeof uuid ).toBe('string')
        expect(uuid.length).toBe(36)

    })

})