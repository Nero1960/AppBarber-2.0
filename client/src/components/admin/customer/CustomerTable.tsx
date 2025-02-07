import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Customer } from "@/types/index";
import { formatDate } from "@/utils/formatDate";
import { Mail, Phone, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

type CustomerTableProps = {
  customer: Customer;
};

export default function CustomerTable({ customer }: CustomerTableProps) {
  const navigate = useNavigate();

  return (
    <TableRow className="hover:bg-[#2A2A2A] transition-colors">
      <TableCell className="font-medium">
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={`${import.meta.env.VITE_IMAGE_URL}/${customer.image}`}
            alt={customer.name}
          />
          <AvatarFallback>
            {customer.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell>
        {customer.name} {customer.lastname}
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span className="flex items-center">
            <Phone className="mr-2 h-4 w-4 text-[#D6A354]" />
            {customer.phone}
          </span>
          <span className="flex items-center mt-1">
            <Mail className="mr-2 h-4 w-4 text-[#D6A354]" />
            {customer.email}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="secondary" className="bg-[#D6A354] text-[#0F0F0F]">
          {customer.totalAppointments}
        </Badge>
      </TableCell>
      <TableCell>
        {customer.lastAppointment
          ? formatDate(customer.lastAppointment)
          : "No visitas"}
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-center">
          <Button
            size="sm"
            variant="outline"
            className="text-white bg-red-500 border-none hover:bg-red-600"
            onClick={() =>
              navigate(location.pathname + `?userId=${customer.userId}`)
            }
          >
            <Trash2 className="w-4 h-4 text-white-50" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
