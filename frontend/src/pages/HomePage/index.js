import cars from '../../cars';
import Car from '../../components/Car';
import './styles.css'

const HomePage = () => {
  return (
    <>
    <section className='home-cars'>
      {cars.map(car => (
        <Car car={car} />
      ))}
    </section> 
    </>
  )
}

export default HomePage