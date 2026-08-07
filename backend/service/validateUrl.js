export const validateUrl = (link) => {
    try {
        const url = new URL(link);
        return url.protocol === 'http:' || url.protocol === 'https:'
        
    } catch (err) {
        return false;
    }
}