const modules = import.meta.glob('/src/assets/**/*.{png,jpg,jpeg,gif,svg}', { eager: true });

export const images = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => {
    const filename = path.split('/').pop(); // Extract filename from path
    return [filename, mod.default || mod];
  })
);

// Function to preload images
export const preloadImages = () => {
  return Promise.all(
    Object.values(images).map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    })
  );
};