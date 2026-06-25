import { getAppointmentData, getCustomers } from "@/api/CustomerApi";
import CardCustomer from "@/components/admin/customer/CardCustomer";
import ChartCustomer from "@/components/admin/customer/ChartCustomer";
import CustomerTable from "@/components/admin/customer/CustomerTable";
import PaginationComponent from "@/components/Pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { CalendarCheck } from "lucide-react";
import RecentUsers from "@/components/admin/RecentUsers";
import { usePagination } from "@/hooks/usePagination";
import TopCustomersTable from "@/components/admin/TopCustomersTable";
import { Spinner } from "@chakra-ui/react";
import CustomerConfirm from "@/components/admin/customer/CustomerConfirm";

// 🚀 IMPORTACIONES NUEVAS PARA EL RESIZE
import { useState, useRef, useCallback, useEffect } from "react";

const MIN_WIDTH = 350; // Ancho mínimo para el gráfico
const MAX_WIDTH_RATIO = 0.70; // El gráfico no puede ocupar más del 70% de la pantalla

export default function CustomerAdmin() {
  const { data, isPending } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
    retry: false,
  });

  const { data: customerData } = useQuery({
    queryKey: ["customerData"],
    queryFn: getAppointmentData,
    retry: false,
  });

  const totalPages = Math.ceil((data?.length || 0) / 4);

  const { currentPage, goToPage } = usePagination({
    totalPages,
  });

  const currentCustomers = data?.slice((currentPage - 1) * 4, currentPage * 4) || [];

  // ==========================================
  // 🚀 LÓGICA DE REDIMENSIONAMIENTO (DRAG & DROP)
  // ==========================================
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState<number | null>(null); // null = 50% por defecto
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  // Limpiar el tamaño si la ventana cambia de tamaño bruscamente
  useEffect(() => {
    const handleWindowResize = () => setChartWidth(null);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    startX.current = e.clientX;
    const container = containerRef.current;
    if (!container) return;
    // Si no tiene ancho definido, agarramos su ancho actual real renderizado en el DOM
    startWidth.current = chartWidth ?? (container.offsetWidth / 2);
  }, [chartWidth]);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const delta = e.clientX - startX.current;
    // Calculamos el nuevo ancho asegurándonos de que no sea muy pequeño ni acapare toda la pantalla
    const newWidth = Math.min(
      Math.max(startWidth.current + delta, MIN_WIDTH),
      containerWidth * MAX_WIDTH_RATIO
    );
    setChartWidth(newWidth);
  }, []);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  // Touch Support (Móviles y Tablets)
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
    const container = containerRef.current;
    if (!container) return;
    startWidth.current = chartWidth ?? (container.offsetWidth / 2);
  }, [chartWidth]);

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const delta = e.touches[0].clientX - startX.current;
    const newWidth = Math.min(
      Math.max(startWidth.current + delta, MIN_WIDTH),
      containerWidth * MAX_WIDTH_RATIO
    );
    setChartWidth(newWidth);
  }, []);

  const onTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [onTouchMove, onTouchEnd]);
  // ==========================================

  return (
    <>
      {isPending ? (
        <Spinner />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <CardCustomer totalCustomer={data?.length || 0} />
          </div>

          <div className="my-10">
            <Card className="w-full bg-[#1F1F1F] text-[#F7F7F7] border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-[#D6A354]">
                  Clientes de Mojica's Barbershop
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-black-400">
                        <TableHead className="w-[100px] text-brown-200">Cliente</TableHead>
                        <TableHead className="text-brown-200">Nombre Completo</TableHead>
                        <TableHead className="text-brown-200">Contacto</TableHead>
                        <TableHead>
                          <div className="flex items-center text-brown-200">
                            <CalendarCheck className="mr-2 h-4 w-4 text-[#D6A354]" />
                            Total Citas
                          </div>
                        </TableHead>
                        <TableHead className="text-brown-200">Última Cita</TableHead>
                        <TableHead className="text-brown-200">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentCustomers!.map((customer) => (
                        <CustomerTable
                          key={customer.userId}
                          customer={customer}
                        />
                      ))}
                    </TableBody>
                  </Table>
                  <CustomerConfirm />
                  <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 🚀 CONTENEDOR FLEXIBLE RESIZEABLE */}
          <div 
            ref={containerRef} 
            className="flex flex-col lg:flex-row gap-0 my-10 relative"
            style={{ userSelect: isDragging.current ? 'none' : 'auto' }}
          >
            
            {/* LADO IZQUIERDO: Gráfico dinámico */}
            <div
              style={{
                width: chartWidth ? `${chartWidth}px` : '50%',
                minWidth: `${MIN_WIDTH}px`,
                transition: isDragging.current ? 'none' : 'width 0.1s ease',
                flexShrink: 0
              }}
              className="w-full lg:w-auto pr-0 lg:pr-4 mb-5 lg:mb-0"
            >
              {customerData && <ChartCustomer data={customerData!} />}
            </div>

            {/* 🚀 MANIJA DE ARRASTRE (DRAG HANDLE) */}
            <div
              className="hidden lg:flex items-center justify-center w-6 -ml-3 cursor-col-resize flex-shrink-0 group z-10"
              onMouseDown={onMouseDown}
              onTouchStart={onTouchStart}
              title="Arrastra para redimensionar"
            >
              {/* Barra visual que se ilumina al pasar el mouse */}
              <div className="w-1 h-16 rounded-full bg-[#D6A354] opacity-40 group-hover:opacity-100 group-hover:h-24 transition-all duration-200" />
            </div>

            {/* LADO DERECHO: Usuarios recientes (Ocupa el resto del espacio flexible) */}
            <div className="flex-1 min-w-0 pl-0 lg:pl-2">
              <RecentUsers />
            </div>

          </div>

          <div>
            <TopCustomersTable />
          </div>
        </>
      )}
    </>
  );
}