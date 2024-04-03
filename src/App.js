import {useEffect, useState} from 'react'

import Loader from 'react-loader-spinner'

import './App.css'

// Replace your code here

const apiURL = 'https://apis.ccbp.in/tg/packages'

const App = () => {
  const [values, setValue] = useState([])

  const [spinner, setSpinner] = useState(true)

  useEffect(() => {
    setSpinner(prevState => !prevState)

    const getApiRequest = async () => {
      const response = await fetch(apiURL)
      const data = await response.json()

      const convertedData = data.packages.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.image_url,
        description: eachItem.description,
      }))

      setValue(convertedData)
    }

    getApiRequest()
  }, [])

  return (
    <div className="bg-container">
      <h1 className="travel-guide-heading">Travel Guide</h1>
      <div className="tavel-guid-card-container">
        {spinner ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <ul className="travel-guide-list">
            {values.map(eachItem => {
              const {description, imageUrl, name} = eachItem
              return (
                <li key={eachItem.id} className="travel-guide-list-item">
                  <div className="travel-guide-card">
                    <img src={imageUrl} alt={name} />
                    <div className="travel-guide-card-content">
                      <p className="name">{name}</p>
                      <p className="description">{description}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
