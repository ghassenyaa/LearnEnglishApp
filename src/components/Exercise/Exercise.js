import React, { useState } from 'react';
import Group from './../../assets/img/Group.png';
import Button from '@material-ui/core/Button';
import './../../components/Button/_taButton.scss';
import MoreVertIcon from '../MoreDetailsIcon/MoreDetailsIcon';
import './_exercise.scss';
import { SortableItem } from 'react-easy-sort';
import { Link } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { getExerciseId, getCourseId } from './../../slices/structureBuilder';
const Exercice = React.memo((props) => {
  const dispatch = useDispatch();
  const {
    id,
    order,
    showbtn,
    name,
    description,
    btncontent,
    img,
    className,
    linkbtn,
    imgclassNameid,
    index,
    onClick,
    showimgexercise,
    deleteitem,
    showMoreDetailsIcon,
    checkboxclick,
  } = props;
  const exercisedata = { ...props };
  const [course, coursename] = name?.includes(':') ? name.split(':') : '';
  const title = name?.includes(':') ? course + ':' + coursename : name;
  const [checked, setChecked] = React.useState(false);
  const [counter, setCounter] = useState(0);
  const handleChange = (event) => {
    setChecked(event.target.checked);
    dispatch(
      checkboxclick({
        id: index,
        label: name,
        checked: event.target.checked,
        notchecked: checked,
        order: counter,
        questionBlockTypeId: id,
      })
    );
    setCounter(counter + 1);
  };
  return (
    <>
      <div className="exercise-card-wrapper" style={{ display: 'flex' }}>
        {showbtn && <div className="card-nbr">#{index > 10 ? index : '0' + index}</div>}
        <SortableItem index={order}>
          <div className="cardnbr-card-wrapper">
            <div className="exercise-card">
              {showMoreDetailsIcon === false ? (
                showMoreDetailsIcon && (
                  <div className="group-container">
                    <img src={Group} alt={'Group'} />
                  </div>
                )
              ) : (
                <div className="group-container">
                  <img src={Group} alt={'Group'} />
                </div>
              )}
              <div className="card-content">
                {showimgexercise && (
                  <div className="icon-container">
                    <img src={img} alt={'exercise-img'} id={imgclassNameid} />
                  </div>
                )}
                <div className="text-conatiner">
                  <div className={className ? `card-title ${className}` : 'card-title'}>
                    {title}
                  </div>
                  {showimgexercise && <div className="card-description">{description} </div>}
                </div>
              </div>
              <div className="button-icon-wrapper">
                {showbtn && (
                  <Link to={{ pathname: linkbtn, data: exercisedata }}>
                    <Button
                      className="ta-btn btn-rounded btn-lg btn exercise-btn"
                      variant="outlined"
                      onClick={() => {
                        dispatch(getExerciseId({ exerciseId: id }));

                        if (id === 'course') {
                          dispatch(getCourseId({ courseId: id }));
                        }
                      }}
                    >
                      {btncontent}
                    </Button>
                  </Link>
                )}
                {showMoreDetailsIcon === false ? (
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                ) : (
                  <MoreVertIcon
                    onClick={onClick}
                    id={id}
                    deleteitem={deleteitem}
                    updateId={props.updateId}
                    deleteStatus={props.deleteStatus}
                  />
                )}
              </div>
            </div>
          </div>
        </SortableItem>
      </div>
    </>
  );
});
export default Exercice;
