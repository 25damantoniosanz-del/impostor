export const categories = {
    'General': ['Apple', 'Book', 'Car', 'Dog', 'Elephant', 'Guitar', 'House', 'Ice Cream', 'Pizza', 'Sun'],
    'Places': ['School', 'Hospital', 'Park', 'Beach', 'Cinema', 'Library', 'Restaurant', 'Airport'],
    'Objects': ['Chair', 'Table', 'Computer', 'Phone', 'Pen', 'Watch', 'Shoes', 'Glasses'],
    'Animals': ['Cat', 'Lion', 'Tiger', 'Bear', 'Rabbit', 'Snake', 'Bird', 'Fish']
};

export const getRandomWord = (category: keyof typeof categories = 'General') => {
    const words = categories[category];
    return words[Math.floor(Math.random() * words.length)];
};
