import React from 'react';
import './_level.scss';
import MoreDetailsIcon from '../../../components/MoreDetailsIcon/MoreDetailsIcon';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import generatecolors from './../../../utilities/generatecolors';
import generatedarkcolors from './../../../utilities/generateDarkColors';
import 'react-circular-progressbar/dist/styles.css';
const level = (props) => {
  const { onClick, id, deleteitem } = props;
  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      contentStyle={{
        background: `linear-gradient(to top, ${generatecolors()} 0%, ${generatedarkcolors()} 100%)`,
        color: 'black',
        BorderRadius: '20px',
      }}
      contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
      iconStyle={{
        background: '#2BA7DF',
        width: '30px',
        height: '30px',
        marginLeft: '-13px',
        marginTop: '15px',
      }}
    >
      <div className="vertical-timeline-content-wrapper">
        <h2>{props.title}</h2>
        <MoreDetailsIcon onClick={onClick} id={id} deleteitem={deleteitem} />
      </div>
    </VerticalTimelineElement>
  );
};

export default level;
