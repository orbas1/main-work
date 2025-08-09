export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert file"));
      }
    };
    reader.onerror = () => reject(reader.error || new Error("File reading error"));
    reader.readAsDataURL(file);
  });
}
