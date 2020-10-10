const tokenResetPassword = require('../../src/utils/tokenResetPassword');

describe('Generate token for reset in password', () =>{
    it('should generate an token for reset in password', () => {
        const token = tokenResetPassword();

        expect(token).toHaveLength(40);
    });
});