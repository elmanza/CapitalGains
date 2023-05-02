
export default function(req, res, next){
  res.status(404).send('Lo siento, no se pudo encontrar la página que estás buscando.');
}