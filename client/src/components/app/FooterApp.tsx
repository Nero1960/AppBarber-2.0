import logo from '@/public/logo2.png'
import { useServicesStore } from '@/store/serviceStore'
import { AiFillTikTok, AiFillTwitterCircle } from 'react-icons/ai'
import { FaLocationDot, FaPhoneVolume } from "react-icons/fa6";
import { BiLogoFacebookCircle } from 'react-icons/bi'
import { RiInstagramFill } from 'react-icons/ri'
import { FaClock } from "react-icons/fa6";

const FooterApp = () => {

  const services = useServicesStore(status => status.services);
  return (
    <footer className="bg-brown-500 py-10">
      <div className="grid lg:grid-cols-3 gap-x-10 max-w-4xl mx-auto px-8 lg:px-0 w-full">
        <div className="flex flex-col gap-y-2 justify-center items-center lg:justify-normal lg:items-start">
          <img src={logo} alt="logo" width={140} height={140} />
          <p className='text-brown-200 text-xs'>Gracias por visitarnos. Síguenos en redes sociales para más novedades.</p>
          <div className="icons flex items-center text-2xl mt-2">
            <BiLogoFacebookCircle className='text-white-500 hover:text-Primary-500 duration-300' />
            <RiInstagramFill className='text-white-500 hover:text-Primary-500 duration-300' />
            <AiFillTikTok className='text-white-500 hover:text-Primary-500 duration-300' />
            <AiFillTwitterCircle className='text-white-500 hover:text-Primary-500 duration-300' />
          </div>
        </div>

        <div className="flex flex-col gap-y-2 justify-center items-center lg:justify-normal lg:items-start">
          <h3 className='font-heading text-white-500 my-5'>Services</h3>
          <ul className='gap-y-3 gap-x-4 text-brown-200 text-xs grid grid-cols-2'>
            {services.map(service => (
              <li key={service.serviceId}>{service.name}</li>
            ))}
          </ul>
        </div>

        <div className='flex flex-col gap-y-2 '>
          <h3 className='font-heading text-white-500 my-5 text-center lg:text-left'>Contacto</h3>
          <div className='flex gap-x-2 items-center'>
            <FaLocationDot className='text-Primary-500' />
            <p className='text-xs text-brown-200'>7 esquinas 25 vrs oeste, Masaya, Nicaragua</p>
          </div>

          <div className='flex gap-x-2 items-center mt-2'>
            <FaPhoneVolume className='text-Primary-500' />
            <p className='text-xs text-brown-200'>8788 2866</p>
          </div>

          <div className='flex gap-x-2 items-center mt-2'>
            <FaClock className='text-Primary-500' />
            <p className="text-xs  text-brown-200">Horarios: <span>Lunes a Sábado: 9:00 AM - 6:00 PM</span></p>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default FooterApp