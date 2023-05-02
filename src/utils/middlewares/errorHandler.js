
export default function errorHandler(err, req, res, next) {
  console.log(err);
  const {
    output: { statusCode, payload },
    stack
  } = err;
  res.status(statusCode);
  res.json({ ...payload, stack });
}