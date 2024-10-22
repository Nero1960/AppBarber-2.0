import logo from '../public/logo2.png'

const Logo = () => {
  return (
    <div>
        <img src={logo} alt="logo" className='max-w-[100%]' width={150} height={150} />
    </div>
  )
}

export default Logo