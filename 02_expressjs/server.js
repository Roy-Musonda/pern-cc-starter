import express from 'express';

const app = express();
const port = 3000;

const router = express.Router();

app.use(express.json());

app.use((req, res, next) => {
    const timeStamp = new Date().toISOString();

    console.log(`[${timeStamp}] ${req.method} ${req.url}`);
    next();
})

let cars  = [
    {id: 1, make: 'Toyota', model: 'Camry', year: 2020, price: 28000},
    {id: 2, make: 'Honda', model: 'Civic', year: 2021, price: 25000},
    {id: 3, make: 'Ford', model: 'F-150', year: 2019, price: 35000},
    {id: 4, make: 'Tesla', model: 'Model 3', year: 2022, price: 45000},
]

app.get('/', (req, res) => {
  res.json(cars);
});

router.get('/id', (req, res) => {
    const id = Number(req.params.id);

    const car = cars.find(car => car.id === id);
    if (!car) return res.status(404).send('Car not found');

    res.json(car)
})

router.post('/', (req, res) => {
    const {make, model, year, price} = req.body;
    if (!make || !model || !year || !price) return res.status(400).send('All fields are required');
    const newCar = {
        id: cars.length + 1,
        make,
        model,
        year: Number(year),
        price: Number(price)
    }
})

router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const car = req.body;
    const index = cars.findIndex(car => car.id === id);
    cars[index] = car;
    res.json(car);
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const index = cars.findIndex(car => car.id === id);
    cars.splice(index, 1);
    res.send("Car successfully deleted");
})

app.use('/api/v1/cars', router);

app.listen(port, () => console.log(`Server is listening on port http://localhost:${port}`))