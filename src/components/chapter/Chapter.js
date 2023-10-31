import React from 'react';
import './_chapter.scss';
import MoreVertIcon from '../MoreDetailsIcon/MoreDetailsIcon';
const Chapter = (props) => {
  const data = { ...props };
  const { id, title, description, image, onClick, deleteitem, deletestatus } = props;
  return (
    <>
      <div to={{ pathname: '/courses', state: data }} className="chapter">
        <img src={image} alt={'chapter-img'} className="image-chapters" />
        <div className="title-description-moreverticon-wrapper">
          <div className="title-description-wrapper">
            <div className="title">{title}</div>
            <div className="description">{description}</div>
          </div>
          <MoreVertIcon
            onClick={onClick}
            deleteitem={deleteitem}
            deletestatus={deletestatus}
            id={id}
            link={'/chapters/courses'}
            linkcontent={'الدروس'}
            langcourses={id}
          />
        </div>
      </div>
    </>
  );
};

export default Chapter;
