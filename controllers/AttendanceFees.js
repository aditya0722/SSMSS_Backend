const { Attendance, Fees } = require("../mongo");

const addMonthlyFee = async (req, res) => {
  try {
    console.log(req.body)
    const { memberId, newDate, status } = req.body;
    
    if (!memberId || !newDate || !status) {
      return res.status(400).json({ error: "All fields are required" });
    }

   

    const updatedFee = await Fees.findOneAndUpdate(
      { memberId, date: newDate },
      { memberId, date: newDate, status },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({ message: "Monthly fee added/updated successfully", data: updatedFee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const parseAndFormatDate = (dateStr) => {
  const [month, day, year] = dateStr.split('/');
  const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  return new Date(formattedDate);
}

const addAttendance = async (req, res) => {
  try {
    let { memberId, newDate, status } = req.body;

    if (!memberId || !newDate || !status) {
      return res.status(400).json({ error: "All fields are required" });
    }
    console.log(newDate)

    const updatedAttendance = await Attendance.findOneAndUpdate(
      { memberId, date: newDate },
      { memberId, date: newDate, status },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({ message: "Attendance added/updated successfully", data: updatedAttendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getalldata = async (req, res) => {
  try {
    // Fetch all data from Attendance and Fees collections
    const attendanceData = await Attendance.find();
    const feesData = await Fees.find();

    // Send the data as response
    res.status(200).json({
      attendance: attendanceData,
      fees: feesData,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json('Error fetching data');
  }
};
const updateAttandanceFine = async (req, res) => {
  try {
    const { memberId, date } = req.body;

    await Attendance.updateOne(
      { memberId: memberId, date:date },
      { $set: { finePaid: true } }
    );

    res.status(200).json("Success");
  } catch (error) {
    console.error('Error updating attendance fine:', error);
    res.status(500).json("Error");
  }
};

const updateMothlyFee=async(req,res)=>{
  const {memberId, date}=req.body;
  await Fees.updateOne(
    { memberId: memberId, date: date },
    { $set: { fine: true } }
  );
  res.status(200).json("successs")
}

module.exports = { addMonthlyFee, addAttendance,getalldata,updateAttandanceFine,updateMothlyFee };
