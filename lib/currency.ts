export const getCurrencySymbol = (currency: string | undefined | null) => {
    switch (currency) {
        case 'SAR': return 'SAR';
        case 'INR': return '₹';
        case 'EUR': return '€';
        case 'GBP': return '£';
        case 'USD': return '$';
        default: return '$';
    }
};
