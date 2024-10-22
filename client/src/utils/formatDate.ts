export function formatDate(fecha: string): string {
    // Dividir la fecha en partes
    const [year, month, day] = fecha.split('-').map(Number);

    // Crear un objeto Date a partir de las partes de la fecha
    const date = new Date(year, month - 1, day); // El mes en JavaScript es 0-indexado

    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
        throw new Error('Fecha inválida');
    }

    // Opciones de formato
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

    // Formatear la fecha en español
    return date.toLocaleDateString('es-NI', options);
}