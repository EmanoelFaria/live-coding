const Auth = require('../../models/classes/Auth');

describe('#encryot', async () => {
  it('should return encrypted hash', async () => {
    const password = 'developmet';
    const encryptedPassword = await Auth.encrypt(password);
    expect(encryptedPassword).not.toEqual(password);
  });

  it('should return true for valid password', async () => {
    const password = 'developmet';
    const encryptedPassword = await Auth.encrypt(password);
    const isEquivalent = await Auth.compare(password, encryptedPassword);
    expect(isEquivalent).toBe(true);
  });

  it('should return true for valid password', async () => {
    const password = await Auth.generateSalt();
    const encryptedPassword = await Auth.encrypt(password);
    const isEquivalent = await Auth.compare(password, encryptedPassword);
    expect(isEquivalent).toBe(true);
  });

  it('should return false for invalid password', async () => {
    const password = 'senhacorreta';
    const wrongPassword = 'senhaerrada';
    const encryptedPassword = await Auth.encrypt(password);
    const isEquivalent = await Auth.compare(wrongPassword, encryptedPassword);
    expect(isEquivalent).toBe(false);
  });

  it('should generate salt', async () => {
    const randomNumber = await Auth.generateSalt();
    console.log(randomNumber);
    expect(randomNumber).toBe(randomNumber);
  });
});
