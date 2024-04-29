import db from "../database/config.js";
import { convertTimeStampToDate } from "../functions/functions.js";
const { PAGINATION } = process.env;

export const getAbsences = async (req, res) => {
  let pages = parseInt(req.query.pages);
  let offset = (pages - 1) * PAGINATION;
  try {
    const data = await db("absence")
      .orderBy("id", "asc")
      .offset(offset)
      .limit(PAGINATION);
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAbsencesOfEmployee = async (req, res) => {
  let pages = parseInt(req.query.pages);
  let offset = (pages - 1) * PAGINATION;
  try {
    const data = await db("absence")
      .where("e_log_id", req.params.e_log_id)
      .orderBy("id", "asc")
      .offset(offset)
      .limit(PAGINATION);
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAbsence = async (req, res) => {
  try {
    const data = await db("absence").where("id", req.params.id);
    return res.status(200).json({ data: data[0] });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const checkCheckIn = async (req, res) => {
  try {
    let today = new Date();
    let data = await db("absence")
      .where("e_log_id", req.params.e_log_id)
      .orderBy("id", "desc")
      .limit(1);
    if (data.length === 0) return res.status(200).json({ data: false });

    if (
      convertTimeStampToDate(data[0]?.check_in) ===
      today.toISOString().split("T")[0]
    ) {
      return res.status(200).json({ data: true });
    } else {
      return res.status(200).json({ data: false });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const checkCheckOut = async (req, res) => {
  try {
    let today = new Date();
    let data = await db("absence")
      .where("e_log_id", req.params.e_log_id)
      .orderBy("id", "desc")
      .limit(1);
    if (data.length === 0) return res.status(200).json({ data: false });

    if (
      convertTimeStampToDate(data[0]?.check_out) ===
      today.toISOString().split("T")[0]
    ) {
      return res.status(200).json({ data: true });
    } else {
      return res.status(200).json({ data: false });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const checkIn = async (req, res) => {
  try {
    let today = new Date();
    let data = await db("absence")
      .where("e_log_id", req.params.e_log_id)
      .orderBy("id", "desc")
      .limit(1);
    console.log(data);
    if (data.length === 0) {
      //the first one have to add
      await db("absence").insert({
        e_log_id: req.params.e_log_id,
        check_in: new Date().toISOString(),
        ...req.body,
      });
      return res.status(200).json({ data });
    } else {
      console.log(
        convertTimeStampToDate(data[0]?.check_in) ===
          today.toISOString().split("T")[0]
      );
      if (
        convertTimeStampToDate(data[0]?.check_in) ===
        today.toISOString().split("T")[0]
      ) {
        return res.status(400).json({ message: "Already did" });
      } else {
        await db("absence").insert({
          e_log_id: req.params.e_log_id,
          check_in: new Date().toISOString(),
          ...req.body,
        });
        return res.status(200).json({ data });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const checkOut = async (req, res) => {
  try {
    let today = new Date();
    let data = await db("absence")
      .where("e_log_id", req.params.e_log_id)
      .orderBy("id", "desc")
      .limit(1);

    if (data && data[0]?.check_in) {
      if (
        convertTimeStampToDate(data[0]?.check_in) !==
        today.toISOString().split("T")[0]
      ) {
        return res.status(400).json({ message: "Check In First" });
      }
      if (data.length === 0) {
        //the first one have to add
        await db("absence").where({ e_log_id: req.params.e_log_id }).update({
          check_out: new Date().toISOString(),
        });
        return res.status(200).json({ data });
      } else {
        if (
          convertTimeStampToDate(data[0]?.check_out) ===
          today.toISOString().split("T")[0]
        ) {
          return res.status(400).json({ message: "Already did" });
        } else {
          await db("absence").where({ e_log_id: req.params.e_log_id }).update({
            check_out: new Date().toISOString(),
          });
          return res.status(200).json({ data });
        }
      }
    } else {
      return res.status(400).json({ message: "Check In First" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteAbsence = async (req, res) => {
  try {
    await db("absence").where("id", req.params.id).del();
    return res.status(200).json({ data: req.param.id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
