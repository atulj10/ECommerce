
import React from 'react'
import { useSearch } from '../context/search'
import Layout from '../components/Layout/Layout'

const Search = () => {
    const [values, setValues] = useSearch()
    return (
        <Layout title={'Search results'}>
            <div className='container'>
                <div className='text-center'>
                    <h1>Search Results</h1>
                    <h6>
                        {values?.result.length < 1 ? "No products Found" : `Found ${values?.result.length}`}
                    </h6>
                    {values?.result.map((p) => (
                        <div className="card m-2" style={{ width: '18rem' }} >
                            <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description.substring(0, 30)}...</p>
                                <p className="card-text">${p.price}</p>
                                <button class="btn btn-primary ms-1">More Details</button>
                                <button class="btn btn-secondary ms-1">Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </Layout>
    )
}

export default Search
