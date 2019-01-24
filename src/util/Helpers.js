function formatCents(cents) {
    /**
     * Formats a number into a number with tenths and hundredths digits (essentially moving decimal place two spaces
     * to the right).
     */
    // Place decimal between dollars and cents.
    return (cents / 100).toFixed(2);
}

export default formatCents;
