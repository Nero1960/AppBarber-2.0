import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { ChartType } from "./types";

interface Props {
    value: ChartType;
    onChange: (value: ChartType) => void;
    allowedTypes?: ChartType[]; // 🚀 NUEVO: Prop opcional para filtrar opciones dinámicamente
}

const ChartSelector = ({
    value,
    onChange,
    allowedTypes
}: Props) => {

    const defaultTypes: ChartType[] = ["bar", "line", "area", "composed", "scatter"];

    const actualTypes = allowedTypes || defaultTypes;

    // Diccionario para renderizar los nombres limpios en la UI
    const labelsMap: Record<ChartType, string> = {
        bar: "Barras",
        line: "Líneas",
        area: "Área",
        composed: "Combinado",
        scatter: "Dispersión",
        
    };

    return (
        <Select
            value={value}
            onValueChange={val => onChange(val as ChartType)}
        >
            <SelectTrigger
                className="w-[170px] bg-[#0F0F0F] border-[#D6A354] text-white-500 h-8 text-xs focus:ring-0"
            >
                <SelectValue placeholder="Tipo gráfico" />
            </SelectTrigger>

            <SelectContent className="bg-[#1F1F1F] border-[#D6A354] text-[#F7F7F7]">
                {/* 🚀 Renderizado dinámico condicional basado en el array inyectado */}
                {actualTypes.map((type) => (
                    <SelectItem key={type} value={type} className="text-xs focus:bg-[#0F0F0F] focus:text-[#D6A354] cursor-pointer">
                        {labelsMap[type] || type}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default ChartSelector;