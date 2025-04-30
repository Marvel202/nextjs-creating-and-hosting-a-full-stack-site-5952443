

// export default async function FetchTest() {
//   const response = await fetch('https://congenial-xylophone-gr5x7x5rgj939w5j-3000.app.github.dev/api/hello');
//   const data = await response.json();

//   return <h1>{data.message}</h1>
// }
export default async function FetchTest() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/hello`);
        if (!response.ok) {
            throw new Error(`Fetch failed with status: ${response.status}`);
        }
        const data = await response.json();
        return <h1>{data.message}</h1>;
    } catch (error) {
        console.error('Error fetching data:', error);
        return <h1>Failed to load data</h1>;
    }
}
