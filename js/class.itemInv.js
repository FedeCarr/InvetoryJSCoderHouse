class itemInv {
  constructor(prod, total, loses, arrDate, price) {
    this.prod = prod;
    this.total = parseInt(total);
    this.loses = parseInt(loses);
    this.arrDate = arrDate;
    this.stock = this.total - this.loses;
    this.price = parseFloat(price);
  }
}
