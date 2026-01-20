const AddCarForm = ({ carAdded }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const make = e.target.make.value;
        const model = e.target.model.value;
        const year = e.target.year.value;
        const price = e.target.price.value;

        fetch('/api/v1/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ make, model, year, price })
        })
            .then(res => res.json())
            .then(data => {console.log(data); carAdded(data)})
            .catch(err => console.log(err))
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="make">Make:</label>
            <input type="text" id="make" name="make" />
            <label htmlFor="model">Model:</label>
            <input type="text" id="model" name="model" />
            <label htmlFor="year">Year:</label>
            <input type="text" id="year" name="year" />
            <label htmlFor="price">Price</label>
            <input type="text" id="price" name="price" />
            <button type="submit">Add Car</button>
        </form>

    )
}

export default AddCarForm