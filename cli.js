import ShareService from "./src/components/shares/services/shareService.js"
import { parseJSONArrays } from "./src/utils/functions/_arrays.js";

// manejar la entrada completa
const input = process.argv.slice(2);

if(input.length){
  // console.log(JSON.parse(input));
  input.forEach(i =>{
    const jsonArrays = parseJSONArrays(i);
    jsonArrays.forEach(operations =>{
      let result = new ShareService(operations).procces();
      console.log(result);
    });
  });
}