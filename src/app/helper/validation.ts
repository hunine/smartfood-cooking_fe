class ValidationHelper {
  static isEmailValid(email: string): boolean {
    const pattern = new RegExp(
      // tslint:disable-next-line: max-line-length
      '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'
    );
    return pattern.test(email);
  }

  static isPasswordValid(password: string): boolean {
    const pattern = new RegExp(
      // tslint:disable-next-line: max-line-length
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    );
    return pattern.test(password);
  }

  static isInputStringValid(name: string, diacriticMode = false): boolean {
    if (diacriticMode) {
      return name.trim().length > 0;
    }

    const pattern = new RegExp('^[a-zA-Z0-9_.-]+$');
    return pattern.test(name.trim());
  }

  static isPhoneNumberValid(phoneNumber: string): boolean {
    const pattern = new RegExp('^[0-9]{10,11}$');
    return pattern.test(phoneNumber);
  }

  static isQuantityValid(quantity: number): boolean {
    return quantity > 0;
  }
}

export default ValidationHelper;
