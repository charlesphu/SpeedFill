export default async function sendPrompt (promptmessage) {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: promptmessage }),
        });
    
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const data = await response.json();
        console.log('API response:', data);
        return data;
    } catch (error) {
        console.error('Error in sendPrompt:', error);
        throw error;
    }
}