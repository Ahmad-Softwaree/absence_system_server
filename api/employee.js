import db from "../database/config.js";
const { PAGINATION } = process.env;

export const getEmployees = async (req, res) => {
  let pages = parseInt(req.query.pages);
  let offset = (pages - 1) * PAGINATION;
  try {
    const data = await db("employee")
      .orderBy("id", "asc")
      .offset(offset)
      .limit(PAGINATION);
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const data = await db("employee").andWhere("id", req.params.id);
    return res.status(200).json({ data: data[0] });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const addEmployee = async (req, res) => {
  try {
    let data = await db("employee").insert({
      e_id: new Date().getTime(),
      ...req.body,
    });
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateEmployee = async (req, res) => {
  try {
    let data = await db("employee")
      .andWhere("id", req.params.id)
      .update(req.body);
    data = await db("employee").where("id", req.params.id);
    return res.status(200).json({ data: data[0] });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteEmployee = async (req, res) => {
  try {
    await db("employee").andWhere("id", req.params.id).del();
    return res.status(200).json({ data: req.param.id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
