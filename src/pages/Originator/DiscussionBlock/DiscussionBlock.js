import React, { useState, useEffect } from 'react';
import './_discussionblock.scss';
import BlockTitle from './../blockTitle/BlockTitle';
import { selectedstate } from './../../../slices/words';
import Title from './../../../components/Title/Title';
import { openModal } from '../../../slices/modals';
import Input from './../Input/Input';
import { Button } from '@material-ui/core';
import 'antd/dist/antd.css';
import Dialog from '@mui/material/Dialog';
import { saveselectedPerson, getblockId, emptytemporaryarray } from './../../../slices/select';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import ModalProvider from './../../../components/ModalsProvider';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { openDiscussion } from '../../../slices/discussion';
import Alert from '@mui/material/Alert';
import headphones from './../../../assets/icons/headphones.svg';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Textaudio from './textInputs';
import { emptyarray } from './../../../slices/words';
//import Alert from './../../../assets/img/alert.png';
const DiscussionBox = (props) => {
  const dispatch = useDispatch();
  const { select, selectedPerson, temporarypersons } = useSelector((state) => state.select);
  const [count, setCount] = useState(0);
  const [clicked, setClicked] = useState(false);
  const open = useSelector((state) => state.modals.open);
  const [selected, setSelected] = useState(false);
  const [selectedValue, setSelectedValue] = useState(3);
  const handleSelectChange = (e) => {
    setSelectedValue(e.value);
    setSelected(true);
    handleClickOpen();
  };
  const { id } = props;
  const { persons } = useSelector((state) => state.persons);
  const personsOptions = persons?.map((item) => {
    return {
      value: item.id,
      label: item.name,
      avatar: item.avatar,
    };
  });
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const [openslide, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <BlockTitle
        title={'حوار'}
        icon={<QuestionAnswerOutlinedIcon style={{ color: '#2E6FF1' }} />}
      />
      <Input label="عنوان الحوار" placeholder="اضف عنوان للحوار" />
      <Title title={'الاشخاص'} btnContent={'اضف شخص جديد'} onClick={openModal()} showbtn={false} />
      <Select
        maxMenuHeight={500}
        options={personsOptions}
        value={personsOptions.find((obj) => obj._id === selectedValue)}
        placeholder={'اختر جانبي المحادثة'}
        formatOptionLabel={(person) => {
          return (
            <div className="person-option">
              <img src={person.avatar} alt="person-image" id="person-image" />
              <span style={{ color: 'black' }}>{person.label}</span>
            </div>
          );
        }}
        onChange={handleSelectChange}
      />
      {selectedValue !== 3 && (
        <div
          className="add-another-converstaion"
          onClick={() => {
            setClicked(true);
            dispatch(openDiscussion(persons.find((elt) => elt.id === selectedValue)));
            dispatch(
              saveselectedPerson({
                selectedPerson: persons.find((elt) => elt.id === selectedValue),
              })
            );
            dispatch(
              getblockId({
                blockId: id,
              })
            );
            dispatch(selectedstate({ selected: true }));
            dispatch(emptyarray());
            setCount(count + 1);
          }}
        >
          <AddBoxOutlinedIcon />
          اضف محادثة{' '}
        </div>
      )}

      {persons.length >= 2 || persons.length === 0 ? (
        temporarypersons.map((item, index) => {
          if (selected) {
            return (
              <fieldset
                style={{ width: '100%', padding: '10px', border: '2px solid #489BFF' }}
                key={index}
              >
                <legend style={{ color: '#489BFF', fontWeight: 'bold', width: 'fit-content' }}>
                  <img src={item.avatar} id="speakerimg" />
                  {item.name}
                </legend>
                <div className="text-audio-wrapper" key={index}>
                  {id === 'conversationBlock' && (
                    <Input
                      label="صوت"
                      placeholder="استيراد صوت"
                      img={headphones}
                      id="discussionaudio"
                      speakerId={item.id}
                    />
                  )}
                  <Textaudio
                    speaker={item}
                    position={index}
                    id={id}
                    onClick={emptytemporaryarray()}
                  />
                </div>
                <Button
                  style={{
                    backgroundColor: '#489BFF',
                    color: '#FFFFFF',
                    borderRadius: '30px',
                    width: '266px',
                    height: '54px',
                    margin: 'auto',
                    marginTop: '15px',
                  }}
                  onClick={() => dispatch(emptytemporaryarray())}
                >
                  اضف المحادثة
                </Button>
              </fieldset>
            );
          }
        })
      ) : (
        <Box open={openslide} sx={{ mt: 5 }} onClose={handleClose} TransitionComponent={Transition}>
          <Alert style={{ width: '61%', margin: 'auto' }} variant="filled" severity="warning">
            <span>الرجاء اضافة شخصين على الاقل</span>
          </Alert>
        </Box>
      )}
      {open && <ModalProvider id={'persons'} />}
    </>
  );
};

export default DiscussionBox;
