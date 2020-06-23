import React from 'react';
import axios from 'axios';

class PostRestaurant extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: '',
            body: '',
            resturants: [],
        }
    }

    componentDidMount = () => {
        this.getRestaurants();
    }

    handleChange = e => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        this.setState(() => ({
            [name]: value,
        }))
    };

    clearInputs = () => {
        this.setState({
            title: '',
            body: ''
        })
    };

    getRestaurants = () => {
        axios.get('/api')
        .then((response) => {
            const data = response.data;

            this.setState(() => ({
                resturants: data
            }))
            console.log(this.state.resturants)
        })
        .catch(() => {
            console.log("couldnt fetch data")
        })
    }

    handleSubmit = e => {
        e.preventDefault();

        const payload = {
            title: this.state.title,
            body: this.state.body
        }

        axios({
            url: '/api/save',
            method: 'POST',
            data: payload
        })
        .then(() => {
            console.log('Data has been sent to the server');
            this.clearInputs();
            this.getRestaurants();
        })
        .catch(() => {
            console.log('Data was not sent to the server')
        })
    };

    render(){
        return(
            <>
                <h1>Add a Restaurant</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-input'>
                        <input
                            type='text'
                            name='title'
                            placeholder='Enter Resturant Name'
                            value={this.state.title}
                            onChange={this.handleChange}
                        />
                    </div>
                    <br></br>
                    <div className='form-input'>
                        <textarea
                         name='body'
                         placeholder="Describe resturant"
                         cols='30'
                         rows='10'
                         value={this.state.body}
                         onChange={this.handleChange}
                         />
                    </div>  
                    <button>Submit</button>                  
                </form>
                <div className='restaurant-list'>
                       { this.state.resturants && this.state.resturants.map((resturant, index) => {
                           return <div key={index}>
                                <h3>{resturant.title}</h3>
                                <p>{resturant.body}</p>
                            </div>
                        })}
                </div>
            </>
        )
    }
}

export default PostRestaurant;
