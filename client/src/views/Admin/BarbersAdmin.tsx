import { useBarbersStore } from "@/store/barberStore"

const BarbersAdmin = () => {

    const barbers = useBarbersStore(state => state.barbers);
    
    return (
        <div>BarbersAdmin</div>
    )
}

export default BarbersAdmin