import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Barber } from "@/types/index";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

type BarberTableProps = {
  barber: Barber;
};


const BarberTable = ({ barber }: BarberTableProps) => {

  const navigate = useNavigate();

  return (
    <>
      <TableRow
        key={barber.barberId}
        className="hover:bg-[#2A2A2A] transition-colors"
      >
        <TableCell className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage
              src={`${import.meta.env.VITE_IMAGE_URL}/${barber.image}`}
              alt={barber.name}
            />
            <AvatarFallback>
              {barber.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-0 text-[#F7F7F7]">
            <p className="font-bold">{barber.name}</p>
            <p className="opacity-50">{barber.lastname}</p>
          </div>
        </TableCell>
        <TableCell>
          <p className="text-[#F7F7F7]">{barber.email}</p>
        </TableCell>
        <TableCell>
          <p className="text-[#F7F7F7]">{barber.phone}</p>
        </TableCell>
        <TableCell>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              className="bg-Primary-500 border-none text-[#0F0F0F] hover:bg-[#B88A45] hover:text-[#F7F7F7]"
              onClick={() => navigate(location.pathname + `?barberId=${barber.barberId}`) }

            >
              <Edit className="w-4 h-4 text-white-500" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-white bg-red-500 border-none hover:bg-red-600"
              onClick={() => navigate(location.pathname + `?barber=${barber.barberId}`) }
            >
              <Trash2 className="w-4 h-4 text-white-50" />
            </Button>
          </div>
        </TableCell>
      </TableRow>

    </>
  );
};

export default BarberTable;
