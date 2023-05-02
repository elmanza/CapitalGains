const caseOptions = [
  {
    op: `[{"operation":"buy", "unit-cost":10.00, "quantity": 100},
    {"operation":"sell", "unit-cost":15.00, "quantity": 50},
    {"operation":"sell", "unit-cost":15.00, "quantity": 50}]`
  },
  {
    op: `[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
    {"operation":"sell", "unit-cost":20.00, "quantity": 5000},
    {"operation":"sell", "unit-cost":5.00, "quantity": 5000}]`
  },
  {
    op: `[{"operation":"buy", "unit-cost":10.00, "quantity": 100},
    {"operation":"sell", "unit-cost":15.00, "quantity": 50},
    {"operation":"sell", "unit-cost":15.00, "quantity": 50}]
    [{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
    {"operation":"sell", "unit-cost":20.00, "quantity": 5000},
    {"operation":"sell", "unit-cost":5.00, "quantity": 5000}]`
  },
  {
    op: `[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
    {"operation":"sell", "unit-cost":5.00, "quantity": 5000},
    {"operation":"sell", "unit-cost":20.00, "quantity": 3000}]`
  },
  {
    op: `[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
    {"operation":"buy", "unit-cost":25.00, "quantity": 5000},
    {"operation":"sell", "unit-cost":15.00, "quantity": 10000}]`
  },
  {
    op: `[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
    {"operation":"buy", "unit-cost":25.00, "quantity": 5000},
    {"operation":"sell", "unit-cost":15.00, "quantity": 10000},
    {"operation":"sell", "unit-cost":25.00, "quantity": 5000}]`
  },
  {
    op: `[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
    {"operation":"sell", "unit-cost":2.00, "quantity": 5000},
    {"operation":"sell", "unit-cost":20.00, "quantity": 2000},
    {"operation":"sell", "unit-cost":20.00, "quantity": 2000},
    {"operation":"sell", "unit-cost":25.00, "quantity": 1000}]`
  },
  {
    op: `[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
    {"operation":"sell", "unit-cost":2.00, "quantity": 5000},
    {"operation":"sell", "unit-cost":20.00, "quantity": 2000},
    {"operation":"sell", "unit-cost":20.00, "quantity": 2000},
    {"operation":"sell", "unit-cost":25.00, "quantity": 1000},
    {"operation":"buy", "unit-cost":20.00, "quantity": 10000},
    {"operation":"sell", "unit-cost":15.00, "quantity": 5000},
    {"operation":"sell", "unit-cost":30.00, "quantity": 4350},
    {"operation":"sell", "unit-cost":30.00, "quantity": 650}]`
  },
  {
    op: `[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
    {"operation":"sell", "unit-cost":50.00, "quantity": 10000},
    {"operation":"buy", "unit-cost":20.00, "quantity": 10000},
    {"operation":"sell", "unit-cost":50.00, "quantity": 10000}]`
  },
  {
    op: `[{"operation":"buy", "unit-cost": 5000.00, "quantity": 10},
    {"operation":"sell", "unit-cost": 4000.00, "quantity": 5},
    {"operation":"buy", "unit-cost": 15000.00, "quantity": 5},
    {"operation":"buy", "unit-cost": 4000.00, "quantity": 2},
    {"operation":"buy", "unit-cost": 23000.00, "quantity": 2},
    {"operation":"sell", "unit-cost": 20000.00, "quantity": 1},
    {"operation":"sell", "unit-cost": 12000.00, "quantity": 10},
    {"operation":"sell", "unit-cost": 15000.00, "quantity": 3}]`
  }
]

document.addEventListener("DOMContentLoaded", function() {
  let cases = this.getElementById('cases');
  let textarea = this.getElementById('editor');
  let processBtn = this.getElementById('process');
  let result = this.getElementById('result');
  textarea.value =  JSON.stringify(JSON.parse(caseOptions[0].op), null, 2);

  cases.onchange = function() {
    let data = caseOptions[cases.value].op;
    try{
      data = JSON.parse(data);
      textarea.value = JSON.stringify(JSON.parse(caseOptions[cases.value].op), null, 2);
    }catch(e){
      textarea.value = data;
    }
    // textarea.value = JSON.stringify(JSON.parse(caseOptions[cases.value].op), null, 2);
  };

  processBtn.addEventListener('click', function() {
    processShare(textarea.value.replace(/\s+/g, ''), result);
  });

  // processBtn.click();
   
  
  
});

function processShare(shares, result){
  fetch(`http://localhost:3000/shares?operations=${shares}`)
  .then(response => response.json())
  .then(data => {console.log(data); result.textContent  = data.response;})
  .catch(error => {console.error(error); result.textContent  = "Error!";});
}

