import { strFromU8, strToU8, unzlibSync, zlibSync } from "fflate"

export function compress(data: string): string {
  const buffer = new TextEncoder().encode(data); 
  const zipped = zlibSync(buffer, { level: 9 });
  const str = strFromU8(zipped, true);
  return btoa(str);
}

export function uncompress(base64: string): string {
  const binary = atob(base64); 
  const buffer = strToU8(binary, true);
  const unzipped = unzlibSync(buffer);
  return new TextDecoder().decode(unzipped);
}