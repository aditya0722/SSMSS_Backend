const { Attendance, Fees } = require("../mongo");

const addMonthlyFee = async (req, res) => {
  try {
    const { memberId, date, status } = req.body;

    if (!memberId || !date || !status) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const formattedDate = new Date(date);

    const updatedFee = await Fees.findOneAndUpdate(
      { memberId, date: formattedDate },
      { memberId, date: formattedDate, status },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({ message: "Monthly fee added/updated successfully", data: updatedFee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addAttendance = async (req, res) => {
  try {
    const { memberId, date, status } = req.body;

    if (!memberId || !date || !status) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const formattedDate = new Date(date);

    const updatedAttendance = await Attendance.findOneAndUpdate(
      { memberId, date: formattedDate },
      { memberId, date: formattedDate, status },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({ message: "Attendance added/updated successfully", data: updatedAttendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addMonthlyFee, addAttendance };
