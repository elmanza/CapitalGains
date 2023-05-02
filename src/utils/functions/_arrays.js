

export function parseJSONArrays(inputString) {
  const jsonArrays = [];
  let currentArray = '';

  for (let i = 0; i < inputString.length; i++) {
    const char = inputString[i];

    if (char === '[') {
      // Comenzamos un nuevo array  
      currentArray = char;
    } else if (char === ']') {
      // Finalizamos el array actual
      currentArray += char;

      try {
        const jsonArray = JSON.parse(currentArray);
        jsonArrays.push(jsonArray);
      } catch (error) {
        throw new Error(`No se pudo parsear el array`);
      }

      currentArray = '';
    } else if (currentArray) {
      // Estamos dentro de un array
      currentArray += char;
    }
  }

  return jsonArrays;
}