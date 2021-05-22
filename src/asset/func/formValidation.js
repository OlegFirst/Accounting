import { AUTHENTICATION } from '../constants';
const { name, password } = AUTHENTICATION;

export const nameValidation = arg => {
  if (arg.length > name.length)
    return false;
  return name.pattern.test(arg);
};

export const passwordValidation = arg => {
  if (arg.length > password.length)
    return false; 
  // Should contain at least one digit (?=.*\d)
  // Should contain at least one lower case (?=.*[a-z])
  // Should contain at least one upper case (?=.*[A-Z])
  return password.pattern.test(arg);
};