const encryptedPassword = require('../../src/utils/encryptedPassword');

describe('Generate token for reset in password', () =>{
    it('should generate an token for reset in password', async () => {
        const password = "12345678";

        const passwordEncrypted = await encryptedPassword(password);

        expect(passwordEncrypted).toHaveLength(60);
    });
});