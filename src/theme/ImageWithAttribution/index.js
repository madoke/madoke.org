import React from 'react';

function ImageWithAttribution({src, imageName, imageUrl, authorName, sourceName}) {
  return (
    <div className={"text--center"}>
      <img style={{ width: '100%' }} alt={imageName} src={src}/>
      <div className={"text--right"}>
        <h6>
          Image by {authorName} on <a href={imageUrl}>{sourceName}</a>
        </h6>
      </div>
    </div>
  )
}

export default ImageWithAttribution;
