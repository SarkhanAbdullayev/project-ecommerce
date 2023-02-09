import React from 'react'
import '../../styles/profile/profile.css'
import favorite from '../../assets/header/favorite.svg'

const Favorites = () => {

    const EmptyFavorites = () => {
        return <div className="emptyCart">
        <img className='shoppingImg' src={favorite} alt="" />
        <p className='emptyP text-gray-400 text-center'>Favorilərim siyahısına məhsul əlavə etməmisiniz</p>
        </div>
    }

    return (
        <div className='favoritesTab'>
            <h1>Favorilərim</h1>
            <div className="favoritesContent">
                <EmptyFavorites/>
            </div>
        </div>
    )
}

export default Favorites