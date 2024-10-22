const validateTime = (time: string): boolean => {
    // Convertir la hora en formato HH:MM a un objeto Date
    const selectHour = new Date(`2000-01-01T${time}:00`);

    // Crear objetos Date para las horas de inicio y fin del rango permitido
    const startHour = new Date('2000-01-01T09:00:00'); // 9:00 AM
    const endHour = new Date('2000-01-01T17:00:00');   // 5:00 PM

    // Validar si la hora seleccionada está dentro del rango permitido
    return selectHour >= startHour && selectHour <= endHour;
};

export default validateTime;