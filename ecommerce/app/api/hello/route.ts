// app/api/hello/route.ts
import { getHelloMessage } from '@/lib/hello';

export async function GET() {
  const data = await getHelloMessage();
  return Response.json(data);
}