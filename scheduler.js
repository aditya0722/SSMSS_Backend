// require('dotenv').config();
// const axios = require('axios');

// // Function to send SMS
// const sendSMS = async (phoneNumber, message) => {
//     const apiKey = process.env.FAST2SMS_API_KEY; // Retrieve API key from environment variables
//     const url = `https://www.fast2sms.com/dev/bulkV2`;

//     const params = {
//         authorization: apiKey,
//         route: 'q',
//         message: message,
//         flash: 0,
//         numbers: phoneNumber
//     };

//     try {
//        const response = await axios.get(url, { params });
//        console.log(url,params)
//         console.log(`SMS sent to ${phoneNumber}:`, response.data);
//     } catch (error) {
//         console.error(`Error sending SMS to ${phoneNumber}:`, error.response?.data || error.message);
//     }
// };

// // Function to get absent members and send SMS
// const notifyAbsentMembers = async () => {
//     try {
//         // Fetch absent members
//         const response = await axios.get('https://ssmss-backend.onrender.com/api/absent-today');
//         const absentees = response.data;

//         // Loop through each absentee and send SMS
//         absentees.forEach(async (absentee) => {
//             console.log(absentee)
//             const phoneNumber = absentee; // Adjust if your response format is different
//             const message = `Samsing Sawali Manav Sanskar Samiti, You have been absent today and your fine will be 100 INR.`;
//             await sendSMS(phoneNumber, message);
//           //console.log(phoneNumber, message)

//         });
//     } catch (error) {
//         console.error('Error fetching absent members:', error.response?.data || error.message);
//     }
// };

// // Example usage
// notifyAbsentMembers();
