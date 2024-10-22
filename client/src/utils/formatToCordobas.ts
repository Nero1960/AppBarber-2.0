export function formatToCordobas(amount : number) {
    return new Intl.NumberFormat('es-NI', {
        style: 'currency',
        currency: 'NIO'
    }).format(amount);
};