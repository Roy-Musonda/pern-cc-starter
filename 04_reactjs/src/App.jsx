import AddCarForm from './components/AddCarForm.jsx';
import Car from './components/Car.jsx';
import { useEffect, useState } from 'react';

const App = () => {
  const [cars, setCars] = useState([]);
  const [newlyAddedCar, setNewlyAddedCar] = useState(null) 

  const carAdded = (car) => {
    setNewlyAddedCar(car)
  }


  useEffect(() => {
    fetch('/api/v1/cars')
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch(err => console.log(err))
    
  }, [ newlyAddedCar ]);
  console.log(cars)

  return (
    <div>
      <h1>Welcome to the car store</h1>
      <AddCarForm carAdded={carAdded}/>
      <ul>
        {cars.map(car => (
          <Car key={car.id} {...car}/>
        ))}
      </ul>
    </div>
  )
}

export default App;