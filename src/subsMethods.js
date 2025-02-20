export function countWords(text) {
    if (!text || typeof text !== "string") return 0;
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

export function splitTextIntoChunks(text, maxCharsPerChunk) {
    if (!text || typeof text !== "string" || maxCharsPerChunk <= 0) return [];

    const words = text.trim().split(/\s+/); // Split text into words
    let chunks = [];
    let currentChunk = [];
    let currentLength = 0;
    const totalChars = text.length;

    for (let word of words) {
        if (currentLength + word.length + (currentChunk.length > 0 ? 1 : 0) > maxCharsPerChunk) {
            // If adding the word exceeds the limit, store the chunk
            const chunkText = currentChunk.join(" ");
            const percentage = (chunkText.length / totalChars).toFixed(4);
            chunks.push({ text: chunkText, percentage: parseFloat(percentage) });

            // Start a new chunk
            currentChunk = [word];
            currentLength = word.length;
        } else {
            // Add word to current chunk
            currentChunk.push(word);
            currentLength += word.length + (currentChunk.length > 1 ? 1 : 0); // Account for spaces
        }
    }

    // Push the last chunk if it has words
    if (currentChunk.length > 0) {
        const chunkText = currentChunk.join(" ");
        const percentage = (chunkText.length / totalChars).toFixed(4);
        chunks.push({ text: chunkText, percentage: parseFloat(percentage) });
    }

    return chunks;
}


export function formatMilliseconds(ms) {
    if (typeof ms !== "number" || ms < 0) return "00:00:00,000";

    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;

    return [
        String(hours).padStart(2, '0'),
        String(minutes).padStart(2, '0'),
        String(seconds).padStart(2, '0')
    ].join(":") + "," + String(milliseconds).padStart(3, '0');
}