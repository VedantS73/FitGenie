// pages/api/user.js
export default async function handler(req, res) {
    try {
        // Get the current user's details
        const userDetails = await account.get();
        
        // Extract relevant user information such as login
        const { email, name, registration } = userDetails;
        
        // Do something with the user information
        res.status(200).json({ email, name, registration });
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: 'Unable to fetch user details' });
    }
}
