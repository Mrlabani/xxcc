const supportedDomains = [
    /ww\.mirrobox\.com/,
    /www\.nephobox\.com/,
    /freeterabox\.com/,
    /www\.freeterabox\.com/,
    /1024tera\.com/,
    /4funbox\.co/,
    /www\.4funbox\.com/,
    /mirrobox\.com/,
    /nephobox\.com/,
    /terabox\.app/,
    /terabox\.com/,
    /www\.terabox\.ap/,
    /www\.terabox\.com/,
    /www\.1024tera\.co/,
    /www\.momerybox\.com/,
    /teraboxapp\.com/,
    /momerybox\.com/,
    /tibibox\.com/,
    /www\.tibibox\.com/,
    /www\.teraboxapp\.com/
];

export default async function handler(req, res) {
    const { query } = req;
    const videoUrl = query.que;

    // Check if 'que' parameter is provided
    if (!videoUrl) {
        return res.status(400).json({ error: 'Missing video URL. Please provide ?que=url' });
    }

    // Validate the provided video URL against supported domains
    const isValidUrl = supportedDomains.some(domain => domain.test(videoUrl));
    if (!isValidUrl) {
        return res.status(400).json({ error: 'Invalid URL. Please provide a URL from a supported domain.' });
    }

    // Prepare request to Terabox API
    const encodedVideoUrl = encodeURIComponent(videoUrl);
    const teraboxApiUrl = `https://terabox.com/path/to/video?url=${encodedVideoUrl}`; // Update this path as needed

    // Set up headers
    const headers = {
        'Cookie': getTeraboxCookies(),
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    };

    try {
        const response = await fetch(teraboxApiUrl, { headers });
        if (!response.ok) {
            return res.status(response.status).json({ error: response.statusText });
        }

        const data = await response.json(); // Assuming the response is in JSON format
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching from Terabox:', error);
        return res.status(500).json({ error: 'Error fetching video.' });
    }
}

// Function to return the Terabox cookies
function getTeraboxCookies() {
    return `
        .1024terabox.com	TRUE	/	FALSE	1734110657	browserid	KkqiaAO3p12oizrUcNK5p-GY29s-vV1iigMPSjxVwsniG-0evN4Kk3YfGsM=
        .1024terabox.com	TRUE	/	FALSE	1731519259	lang	en
        .1024terabox.com	TRUE	/	FALSE	1763514767	__bid_n	1928c0f31aeb2e65094207
        .www.1024terabox.com	TRUE	/	TRUE	1760462675	__stripe_mid	ba71d03c-75a9-4504-aae2-ddc3d00744e07227ab
        .1024terabox.com	TRUE	/	TRUE	1760462688	ndus	YQhUH3CteHuisY28unyKW-CLfFjxTknFOPm9rQkP
        .1024terabox.com	TRUE	/	FALSE	1763514768	_ga	GA1.1.250660626.1728927138
        www.1024terabox.com	FALSE	/	FALSE	1731546766	ndut_fmt	9A1AAD656E4100E6655E3027B51639F402CF5DB5833899914679A0691EB248A8
        .1024terabox.com	TRUE	/	FALSE	1763514777	_ga_06ZNKL8C2E	GS1.1.1728954768.2.0.1728954777.51.0.0
        www.terabox.com	FALSE	/	FALSE	0	csrfToken	m11-xQY5Px2RsGgSaJp3BXGi
        .terabox.com	TRUE	/	FALSE	1734139217	browserid	ouU6uRozT6X1tJt8SOFi2YjzGCYcUTAGDs6vbOk2vD5ITkUP2Bbo2ZEAUCI=
        .terabox.com	TRUE	/	FALSE	1731547254	lang	en
        .terabox.com	TRUE	/	FALSE	1763515260	__bid_n	1928dc2ff82c89d1af4207
        .ymg-api.terabox.com	TRUE	/	TRUE	1763515263	ab_jid	dc6e96b3fb153bbe713dd28f05fc110e392b
        .terabox.com	TRUE	/	TRUE	1760491244	ndus	YQhUH3CteHuiBsaOUy0faM-WT6TLhlQ1UcX32w37
        www.terabox.com	FALSE	/	FALSE	1731547260	ndut_fmt	9C5DFE0581A745A9AD4B0B634DC2B5F5E49D67EB9E62DF923B9E72B16830D23A
        .ymg-api.terabox.com	TRUE	/	TRUE	1763515263	ab_bid	96b3fb153bbe713dd28f05fc110e392c0799
        .terabox.com	TRUE	/	TRUE	1728962463	ab_sr	1.0.1_MzBhNjVhMWZkOGM5YjhhOTU1MTk3ZTg2YWFkYzUxYmVlZmUzMjkwZTliMjE5NWM2ZjdkNmRkMGJjZjM2NzA1MDNhMGNkODUxNGI2YWI0NDkzMWFkZGYwM2QyMzhmZDRmNGQ4NDc1MzBjZGM4ZjM0ZGE0YzI5MmNlYTQxM2FkYTQ1NDUzNjA4NGQ5M2FmYTMyZTk2MDhhOTk1NzcwNTk4Mw==
        .terabox.com	TRUE	/	FALSE	1763515265	_ga	GA1.1.505789176.1728955266
        .terabox.com	TRUE	/	FALSE	1763515280	_ga_06ZNKL8C2E	GS1.1.1728955265.1.1.1728955280.45.0.0
    `.trim();
}
