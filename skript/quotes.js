async function getQuote() {
    const apiKey = 'DX/RKxnboDiBvoVX1r2ahQ==wq1LvBlp4blVsGxR'; 
    const apiUrl = 'https://api.api-ninjas.com/v1/quotes';

    try {
        const response = await fetch(apiUrl, {
            headers: { 'X-Api-Key': apiKey }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data[0].quote + " - " + data[0].author;
    } catch (error) {
        console.error(error);
        return "No quote available.";
    }
}
