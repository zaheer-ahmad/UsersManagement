export default class DataTablesResponse {
  constructor(draw, recordsTotal, recordsFiltered, data) {
    this.draw = draw;
    this.recordsTotal = recordsTotal;
    this.recordsFiltered = recordsFiltered;
    this.data = data;
  }
}
