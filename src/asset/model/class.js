export class Office {
  constructor(userName) {
    this.userName = userName;
    this.accounts = [];
    this.currency = 'грн.';
  }
  
  // Setter
  set accountsAll(matrix) {
    this.accounts = matrix;
  }
  
  // Getters
  get name() {
    return this.userName;
  }
  
  get accounts1() {
    return this.accounts;
  }  
}