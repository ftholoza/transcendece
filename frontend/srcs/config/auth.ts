export const config = {
    GOOGLE_CLIENT_ID: '' // Will be populated dynamically
};

export async function initializeConfig() {
    try {
        const response = await fetch('http://localhost:3000/api/auth/config');
        const data = await response.json();
        config.GOOGLE_CLIENT_ID = data.googleClientId;
    } catch (error) {
        console.error('Failed to fetch auth config:', error);
    }
}