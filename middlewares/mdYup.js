const MdYup = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (error) {
    const { message } = error;
    res.status(400).json({
      ok: false,
      status: 400,
      message: message ? message.message : error,
    });
  }
};

export default MdYup;
