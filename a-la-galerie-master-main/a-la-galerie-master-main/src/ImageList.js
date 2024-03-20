import React from 'react';
import './imageList.css';
import ImageCard from './ImageCard';

const ImageList = (props) => {
    const imgs = props.foundImages.map(img => {
        //return <img key={img.id} src={img.urls.regular} alt={img.alt_description} />
        return <ImageCard key={img.id} image={img} />
    });

    return (
        <div className="image__list">{imgs}</div>
    )
}


export default ImageList;