// Tech stack animations
export const techAnimations = {
  // JavaScript animation
  javascript: {
    id: "javascript-anim",
    src: "https://lottie.host/8dbd1736-e27a-4fbd-a707-8e525c39e82b/CS8j1Y0Uwh.json",
  },
  // TypeScript animation
  typescript: {
    id: "typescript-anim",
    src: "https://lottie.host/978b8d49-ae8d-489c-8b17-6e3ec1c1ecd4/Me5Xa1dSQp.json",
  },
  // React animation
  react: {
    id: "react-anim",
    src: "https://lottie.host/3d2c12e0-b298-49da-b13c-a0c0cdccf2a1/nigyvW8eW3.json",
  },
  // Node.js animation
  nodejs: {
    id: "nodejs-anim",
    src: "https://lottie.host/d9e92ae2-366b-4b7a-b03d-d50f23259da4/d3WGw8bzpt.json",
  },
  // Flutter animation
  flutter: {
    id: "flutter-anim",
    src: "https://lottie.host/05bbac70-edff-4b9c-ab54-f58b38aaaf13/gIwiGO3U5C.json",
  },
  // Tailwind animation
  tailwind: {
    id: "tailwind-anim",
    src: "https://lottie.host/34b43232-9217-441a-9dc9-3fb94e7fbb1c/1oTkIFhasa.json",
  },
  // Git animation
  git: {
    id: "git-anim",
    src: "https://lottie.host/d2ced1df-4455-452c-9d8d-43dd5635ea7a/a9YJKzIjdK.json",
  },
  // NextJS animation
  nextjs: {
    id: "nextjs-anim",
    src: "https://lottie.host/12a634c8-b879-4575-b78b-d2827f1f6944/burX0xOjtZ.json",
  },
  // Default animation (fallback for other technologies)
  default: {
    id: "tech-anim",
    src: "https://lottie.host/c4b28673-9da0-4fad-8e2b-a1f43745063c/Rw2Tlj8cIY.json",
  },
};

// Helper function to get tech animation by name
export const getTechAnimation = (techName) => {
  const techNameLower = techName.toLowerCase();

  // Check if we have a specific animation for this tech
  for (const [key, anim] of Object.entries(techAnimations)) {
    if (techNameLower.includes(key)) {
      return anim;
    }
  }

  // Return default animation if no match found
  return techAnimations.default;
};
