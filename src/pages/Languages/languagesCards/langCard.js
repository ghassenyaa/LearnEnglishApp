import React from 'react';
import './_langCard.scss';
import MoreDetailsIcon from '../../../components/MoreDetailsIcon/MoreDetailsIcon';
const LangCard = (props) => {
  const {
    onClick,
    id,
    title,
    color1,
    color2,
    icon,
    courses,
    statusmsg,
    deleteitem,
    deletestatus,
    failstatus,
  } = props;
  return (
    <>
      <div
        className="language_card"
        style={{ backgroundImage: `linear-gradient(to top, ${color1} 0%, ${color2} 100%)` }}
      >
        <div className="img-title-icon-wrapper" style={{ width: '100%' }}>
          <div className="img-title-wrapper">
            <img alt={'icon'} src={icon} />
            <div className="title">{title}</div>
          </div>

          <MoreDetailsIcon
            onClick={onClick}
            deleteitem={deleteitem}
            deletestatus={deletestatus}
            statusmsg={statusmsg}
            failstatus={failstatus}
            id={id}
            link={'/languages/chapters'}
            linkcontent={'الفصول'}
            langcourses={courses}
          />
        </div>
      </div>
    </>
  );
};
export default LangCard;
