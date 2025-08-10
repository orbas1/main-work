export async function reverseGeocode(lat: number, lon: number): Promise<string> {
  const url = `/api/express/location?lat=${lat}&lon=${lon}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch location");
  const data = await res.json();
  return data.location;
}
