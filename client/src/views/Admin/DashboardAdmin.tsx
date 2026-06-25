import { useState, useRef, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAppointmentData } from "@/api/CustomerApi"; 

import AppointmentCancellation from "@/components/admin/appointment/AppointmentCancellation";
import AppointmentsTable from "@/components/admin/appointment/AppointmentTable";
import ChartBarbers from "@/components/admin/barbers/ChartBarbers";
import MonthlyRevenueChart from "@/components/admin/MonthlyRevenueChart";
import PopularHoursChart from "@/components/admin/PopularHoursChart";
import RecentUsers from "@/components/admin/RecentUsers";
import TopServicesChart from "@/components/admin/TopServicesChart";
import WidgetBuilderCanvas from "@/components/admin/widgetBuilder/WidgetBuilderCanvas";
import ChartCustomer from "@/components/admin/customer/ChartCustomer";

const MIN_WIDTH = 350;
const MAX_WIDTH_RATIO = 0.70;

const DashboardAdmin = () => {
  
  const { data: customerData } = useQuery({
    queryKey: ["customerData"],
    queryFn: getAppointmentData,
    retry: false,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState<number | null>(null); // null = 50%
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

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
    startWidth.current = chartWidth ?? (container.offsetWidth / 2);
  }, [chartWidth]);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const delta = e.clientX - startX.current;
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

  // Touch Support
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
    <div className="space-y-4 pb-10">
      <MonthlyRevenueChart />
      <AppointmentsTable />
      <AppointmentCancellation />
      <TopServicesChart />
      <PopularHoursChart />
      <WidgetBuilderCanvas />
      <ChartBarbers />

      <div 
        ref={containerRef} 
        className="flex flex-col lg:flex-row gap-0 relative bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] overflow-hidden mt-8"
        style={{ userSelect: isDragging.current ? 'none' : 'auto' }}
      >
        <div
          style={{
            width: chartWidth ? `${chartWidth}px` : '50%',
            minWidth: `${MIN_WIDTH}px`,
            transition: isDragging.current ? 'none' : 'width 0.1s ease',
            flexShrink: 0
          }}
          className="w-full lg:w-auto pr-0 lg:pr-2 mb-5 lg:mb-0"
        >
          <div className="h-full">
            {customerData && <ChartCustomer data={customerData} />}
          </div>
        </div>

        <div
          className="hidden lg:flex items-center justify-center w-6 -ml-3 cursor-col-resize flex-shrink-0 group z-10"
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          title="Arrastra para redimensionar"
        >
          <div className="w-1 h-16 rounded-full bg-[#D6A354] opacity-40 group-hover:opacity-100 group-hover:h-24 transition-all duration-200" />
        </div>

        <div className="flex-1 min-w-0 pl-0 lg:pl-2">
          <div className="h-full">
            <RecentUsers />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default DashboardAdmin;