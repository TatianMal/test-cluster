/**
 *
 */
class Cluster {
  constructor({ number, coords = [] }) {
    this.number = number;
    this.coords = coords;
  }

  // addCoords() - to hide coords type
  getSize() {
    return this.coords.length;
  }
}

export default Cluster;
