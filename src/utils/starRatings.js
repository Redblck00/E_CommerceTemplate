

export function getStarArray(rating, maxStars = 5) {
    const stars = [];
  
    for (let i = 1; i <= maxStars; i++) {
      if (rating >= i) {
        stars.push("full");
      } else if (rating >= i - 0.5) {
        stars.push("half");
      } else {
        stars.push("empty");
      }
    }
  
    return stars;
  }
  