export function generateRandomSlug() {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let slug = '';

  for (let i = 0; i < 20; i++) {
    slug += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return slug;
}
