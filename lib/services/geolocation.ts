export async function reverseGeocode(lat: number, lon: number): Promise<string> {
  const base = process.env.GEOLOCATION_API_URL;
  if (!base) throw new Error("Missing geolocation endpoint");
  const url = `${base}?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch location");
  const data = await res.json();
  const parts = [data.city || data.locality, data.principalSubdivision, data.countryName]
    .filter(Boolean)
    .join(", ");
  return parts;
}
