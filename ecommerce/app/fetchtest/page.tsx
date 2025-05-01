// app/fetchtest/page.tsx
import { getHelloMessage } from '@/lib/hello';

export default async function FetchTest() {
  try {
    const data = await getHelloMessage();
    return <h1>{data.message}</h1>;
  } catch (error) {
    console.error('Error getting data:', error);
    return <h1>Failed to load data</h1>;
  }
}