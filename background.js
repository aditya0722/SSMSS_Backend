const { Attendance } = require('./mongo'); // Assuming the model is in a 'models' folder
const { member } = require('./mongo'); // Assuming the model is in a 'models' folder

// Function to get the records where the date is today's date and status is "Absent"
const getAbsentContact = async (req, res) => {
    try {
        // Get current date and time in UTC
        const now = new Date();

        // Convert to IST (UTC + 5:30)
        const istOffset = 5 * 60 + 30; // IST offset in minutes
        const istDate = new Date(now.getTime() + istOffset * 60 * 1000);

        // Format the IST date to 'T00:00:00.000Z'
        istDate.setHours(0, 0, 0, 0);
        const formattedISTDate = istDate.toISOString().split('T')[0] + 'T00:00:00.000Z';

        // Set end of the day for comparison (T23:59:59.999Z)
        const endOfDay = new Date(istDate);
        endOfDay.setUTCDate(istDate.getUTCDate() + 2); // Add one day
        endOfDay.setUTCHours(0, 0, 0, 0); // Reset time to 00:00:00.000
        endOfDay.setUTCMilliseconds(-1); 


        console.log('IST Start Date:', formattedISTDate);
        console.log('IST End Date:', endOfDay.toISOString());
        
        // Query the database for records with the date within the IST day and status 'Absent'
        const absentees = await Attendance.find({
            date: {
                $gte: new Date(formattedISTDate),
                $lt: endOfDay
            },
            status: 'Absent'
        }).populate('memberId', 'contact'); // Replace 'contactFieldName' with the actual field name in your Member model
        const contacts=[]
        absentees.map((member)=>{
            contacts.push(member.memberId.contact);
        })
        // Respond with the absentees and their contact information
        res.json(contacts);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

module.exports = getAbsentContact;
