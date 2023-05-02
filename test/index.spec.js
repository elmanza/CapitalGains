import ShareService from "../src/components/shares/services/shareService.js";
describe('Testear funcionalidades de la clase de compra y venta de acciones', ()=>{
  test('Debe retornar un array con al menos un objeto con la siguiente estructura "{tax":"0.00"}"', () => {
    const operations = [
      {"operation":"buy", "unit-cost":10.00, "quantity": 100},
      {"operation":"sell", "unit-cost":15.00, "quantity": 50},
      {"operation":"sell", "unit-cost":15.00, "quantity": 50}
    ]
    let result = new ShareService(operations).procces();
  
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(1);
    const hasExpectedStructure = result.some((obj) => {
      return obj.hasOwnProperty('tax') && typeof obj.tax === 'string' || obj.tax === '0.00';
    });
    expect(hasExpectedStructure).toBe(true);
  });
});

describe('Testeamos todos los casos', ()=>{

  test('Test Case 1', () => {
    const operations = [
      {"operation":"buy", "unit-cost":10.00, "quantity": 100},
      {"operation":"sell", "unit-cost":15.00, "quantity": 50},
      {"operation":"sell", "unit-cost":15.00, "quantity": 50}
    ]
    let result = new ShareService(operations).procces();
    expect(result).toEqual([{tax: "0.00"},{tax: "0.00"},{tax: "0.00"}]);
  });

  test('Test Case 2', () => {
    const operations = [
      {"operation":"buy", "unit-cost":10.00, "quantity": 10000},
      {"operation":"sell", "unit-cost":20.00, "quantity": 5000},
      {"operation":"sell", "unit-cost":5.00, "quantity": 5000}
    ]
    let result = new ShareService(operations).procces();
    expect(result).toEqual([{tax:'0.00'},{tax:'10000.00'},{tax:'0.00'}]);
  });

  test('Test Case 3', () => {
    const operations = [
      {"operation":"buy", "unit-cost":10.00, "quantity": 10000},
      {"operation":"sell", "unit-cost":5.00, "quantity": 5000},
      {"operation":"sell", "unit-cost":20.00, "quantity": 3000}
    ]
    let result = new ShareService(operations).procces();
    console.log(result);
    expect(result).toEqual([{tax: '0.00'},{tax: '0.00'},{tax: '1000.00'}]);
  });

  test('Test Case 4', () => {
    const operations = [
      {"operation":"buy", "unit-cost":10.00, "quantity": 10000},
      {"operation":"buy", "unit-cost":25.00, "quantity": 5000},
      {"operation":"sell", "unit-cost":15.00, "quantity": 10000}
    ]
    let result = new ShareService(operations).procces();
    expect(result).toEqual([{tax: '0.00'},{tax: '0.00'},{tax: '0.00'}]);
  });

  test('Test Case 5', () => {
    const operations = [
      {"operation":"buy", "unit-cost":10.00, "quantity": 10000},
      {"operation":"buy", "unit-cost":25.00, "quantity": 5000},
      {"operation":"sell", "unit-cost":15.00, "quantity": 10000},
      {"operation":"sell", "unit-cost":25.00, "quantity": 5000}
    ]
    let result = new ShareService(operations).procces();
    expect(result).toEqual([{tax: "0.00"},{tax: "0.00"},{tax: "0.00"},{tax: "10000.00"}]);
  });

  test('Test Case 6', () => {
    const operations = [
      {"operation":"buy", "unit-cost":10.00, "quantity": 10000},
      {"operation":"sell", "unit-cost":2.00, "quantity": 5000},
      {"operation":"sell", "unit-cost":20.00, "quantity": 2000},
      {"operation":"sell", "unit-cost":20.00, "quantity": 2000},
      {"operation":"sell", "unit-cost":25.00, "quantity": 1000}
    ]
    let result = new ShareService(operations).procces();
    expect(result).toEqual([{tax: "0.00"},{tax: "0.00"},{tax: "0.00"},{tax: "0.00"},{tax: "3000.00"}]);
  });

  test('Test Case 7', () => {
    const operations = [
      {"operation":"buy", "unit-cost":10.00, "quantity": 10000},
      {"operation":"sell", "unit-cost":2.00, "quantity": 5000},
      {"operation":"sell", "unit-cost":20.00, "quantity": 2000},
      {"operation":"sell", "unit-cost":20.00, "quantity": 2000},
      {"operation":"sell", "unit-cost":25.00, "quantity": 1000},
      {"operation":"buy", "unit-cost":20.00, "quantity": 10000},
      {"operation":"sell", "unit-cost":15.00, "quantity": 5000},
      {"operation":"sell", "unit-cost":30.00, "quantity": 4350},
      {"operation":"sell", "unit-cost":30.00, "quantity": 650}
    ]
    let result = new ShareService(operations).procces();
    expect(result).toEqual([{tax:"0.00"}, {tax:"0.00"}, {tax:"0.00"}, {tax:"0.00"}, {tax:"3000.00"},
    {tax:"0.00"}, {tax:"0.00"}, {tax:"3700.00"}, {tax:"0.00"}]);
  });

  test('Test Case 8', () => {
    const operations = [
      {"operation":"buy", "unit-cost":10.00, "quantity": 10000},
      {"operation":"sell", "unit-cost":50.00, "quantity": 10000},
      {"operation":"buy", "unit-cost":20.00, "quantity": 10000},
      {"operation":"sell", "unit-cost":50.00, "quantity": 10000}
    ]
    let result = new ShareService(operations).procces();
    expect(result).toEqual([{tax:'0.00'},{tax:'80000.00'},{tax:'0.00'},{tax:'60000.00'}]);
  });

  test('Test Case 9', () => {
    const operations = [
      {"operation":"buy", "unit-cost": 5000.00, "quantity": 10},
      {"operation":"sell", "unit-cost": 4000.00, "quantity": 5},
      {"operation":"buy", "unit-cost": 15000.00, "quantity": 5},
      {"operation":"buy", "unit-cost": 4000.00, "quantity": 2},
      {"operation":"buy", "unit-cost": 23000.00, "quantity": 2},
      {"operation":"sell", "unit-cost": 20000.00, "quantity": 1},
      {"operation":"sell", "unit-cost": 12000.00, "quantity": 10},
      {"operation":"sell", "unit-cost": 15000.00, "quantity": 3}
    ]
    let result = new ShareService(operations).procces();
    expect(result).toEqual([{tax:"0.00"},{tax:"0.00"},{tax:"0.00"},{tax:"0.00"},{tax:"0.00"},{tax:"0.00"},{tax:"1000.00"},{tax:"2400.00"}]);
  });


});