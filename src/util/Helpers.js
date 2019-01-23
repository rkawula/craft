function formatCents(cents) {
    // Place decimal between dollars and cents.
    return (cents / 100).toFixed(2);
}

export default formatCents;
