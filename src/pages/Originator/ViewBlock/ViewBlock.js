import React, { useState } from 'react';
import './_viewblock.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import TabletAndroidIcon from '@mui/icons-material/TabletAndroid';
import Column from '../Column';
import Title from '../../../components/Title/Title';
import laptop from './../../../assets/icons/laptop.svg';
import construction from './../../../assets/img/construction.png';
import UploadLimit from './../../../assets/img/uploadimg2.png';
import audioimg from './../../../assets/img/unlimited-voice-recording.jpg';
import TipWords from './../../../components/tipWords/tipWords';
import tipimage from './../../../assets/img/tipimage.png';
import AdviceBlock from './../AdviceBlock/AdviceBlock';
import { saveBlocksData } from './../../../slices/structureBuilder';
import { useSelector, useDispatch } from 'react-redux';
const Item2 = (props) => {
  const { columns, onSortEnd, isdragging, area } = props;
  const {
    file,
    imageUrl,
    audioUrl,
    type,
    question,
    correctChoise1,
    correctChoise2,
    correctChoise3,
    title,
    description,
    text,
    arrayWord,
    questionsDrag,
    answersDrag,
    correctAnswers,
    correctChoise,
    correctanswerId,
    answer,
    trueAnswer,
    speakerId,
    arrayWriteInTheBlanks,
  } = useSelector((state) => state.files);
  const { label } = useSelector((state) => state.selectinput);

  const dispatch = useDispatch();
  const { speeches, speeches2, speeches3, wordList, sentences } = useSelector(
    (state) => state.words
  );
  const { blockId } = useSelector((state) => state.select);

  const { selectedPerson } = useSelector((state) => state.select);
  const { text1, text2 } = useSelector((state) => state.files);
  const { exerciseId, questionTitle, questionBlockswrapper } = useSelector(
    (state) => state.structureBuilder
  );
  const [counter, setCounter] = useState(0);
  const { questionBlockTypeId, order } = useSelector((state) => state.selectinput);
  const BlocksData = {
    func: saveBlocksData,
    data: {
      title: questionTitle,
      questionBlockTypeId: questionBlockTypeId,
      order: questionBlockswrapper.length,
      persons: selectedPerson,
      speeches: speeches,
      exerciseId: exerciseId,
      blockId: blockId,
      words: arrayWord,
      words2: arrayWriteInTheBlanks,
      answers: correctChoise,
      correctAnswerId: correctanswerId,
      question: question,
      answer: answer,
      trueAnswer: trueAnswer,
      titleBlock: title,
      textBlock: text,
      description: description,
      questionsDrag: questionsDrag,
      answersDrag: answersDrag,
      correctAnswers: correctAnswers,
      text: text,
      audioUrl: audioUrl,
      speeches2: speeches2,
      speeches3: speeches3,
      text1: text1,
      text2: text2,
      sentences: sentences,
      imageUrl: imageUrl,
      wordList: wordList,
    },
  };

  return (
    <div className="item2">
      <div className="item2-title">
        <Title
          title={'اسم التمرين :نصيحة'}
          btnContent={' حفظ'}
          showbtn={false}
          showimg={true}
          showinput={true}
          counter={counter}
          setCounter={setCounter}
          saveData={BlocksData}
          className="item-title"
        />
      </div>
      <div className="btn-wrapper">
        <button id="mobile-view">
          Mobile View
          <TabletAndroidIcon />
        </button>
        <button id="web-view">
          Web View
          <img src={laptop} alt={'laptop'} />
        </button>
      </div>
      <div className="phone">
        {label.find((elt) => elt.label === 'العنوان')?.label && (
          <>
            {' '}
            <span className="title-input-view">العنوان</span>
            <div className="title-block-view">
              {!title && <span className="placeholder-viex-block">قم بادخال العنوان ... </span>}
              {title}
            </div>
          </>
        )}
        {label.find((elt) => elt.label === 'نصيحة')?.label && (
          <div className="tip-block">
            <img id="tip-img" src={tipimage} />
            <div className="text1">
              <span> النص الاول :</span>
              <div className="text-wrapper">{text1}</div>
            </div>
            <div className="text1">
              <span> النص الثاني :</span>
              <div className="text-wrapper">{text2}</div>
            </div>
            <span id="list-word">قائمة الكلمات :</span>
            <div className="words-wrapper" dir="ltr">
              {wordList.map((item, index) => {
                return <TipWords key={index} word={item} />;
              })}
            </div>
          </div>
        )}

        {label.find((elt) => elt.label === 'صورة')?.label && (
          <>
            <div id="outside">
              {!imageUrl && (
                <div className="img-label-view-wrapper">
                  <img src={UploadLimit} alt="" className="upload-image" />
                  <span className="img-title">اضف الصورة</span>
                </div>
              )}
              {imageUrl && (
                <img src={imageUrl} id="image" alt={'image'} />
                /*  { ) : type.includes('فيديوا') ? (
                <video src={file} id="video" controls />
              ) : null} */
              )}
            </div>
          </>
        )}
        {label.find((elt) => elt.label === 'صوت')?.label && (
          <>
            <span className="title-input-view">الصوت</span>
            <div className="audio-block-view">
              {!audioUrl && (
                <div className="audio-viewblock">
                  <img src={audioimg} alt="" className="audio-block-image" />
                  <span className="title-audio-view">اضف الصوت</span>
                </div>
              )}
              {audioUrl ? <audio src={audioUrl} controls /> : null}{' '}
            </div>
          </>
        )}

        {label.find((elt) => elt.label === 'انشاء جملة')?.label && (
          <>
            <div className="phrase-builder">
              <img src={construction} />
              <span> يرجى الانتباه لهذه الجملة :</span>
              <div className="sentences-wrapper" dir="ltr">
                {sentences?.map((item, index) => {
                  return <TipWords key={index} word={item.content} />;
                })}
              </div>
            </div>
          </>
        )}
        {label.find((elt) => elt.label === 'نص')?.label && (
          <>
            <span className="title-input-view">النص</span>
            <div className="title-block-view">
              {!text && <span className="placeholder-viex-block">قم بادخال النص ... </span>}
              {text}
            </div>
          </>
        )}
        {label.find((elt) => elt.label === 'وصف')?.label && (
          <>
            <span className="title-input-view">الوصف</span>
            <div className="title-block-view">
              {!description && <span className="placeholder-viex-block">قم بادخال الوصف ... </span>}
              {description}
            </div>
          </>
        )}
        {label.find((elt) => elt.label === 'صحيحةاو خاطئة')?.label && (
          <div className="wrapper-truefalse-block">
            <>
              <div className="questiontruefalse-block">
                {!question && <span className="placeholder-viex-block">قم بادخال السوال ... </span>}
                {question}
              </div>
              <div className="questiontruefalse-block">
                {!question && (
                  <span className="placeholder-viex-block">قم بادخال الاجابة ... </span>
                )}
                {answer}
              </div>

              <div className="true-block">صحيح</div>
              <div className="false-block ">خطا</div>
            </>
          </div>
        )}
        {label.find((elt) => elt.label === 'اختيار  صحيح')?.label && (
          <div className="onecorrectchoice-block">
            <div className="onecorrectchoice">{correctChoise1}</div>
            <div className="onecorrectchoice">{correctChoise2}</div>
            <div className="onecorrectchoice">{correctChoise3}</div>
          </div>
        )}
        {label.find((elt) => elt.label === 'إملأ الفراغات')?.label && (
          <>
            <div className="wrapper-fillintheblanks">
              {arrayWord.map((word) => {
                if (word.ishidden === false) {
                  return <div className="fillintheblanks-block">{word.content}</div>;
                }
              })}
            </div>
            <div className="wrapper-fillintheblanks-hidden-words">
              {arrayWord.map((word) => {
                if (word.ishidden === true) {
                  return <div className="fillintheblanks-hidden-words-block">{word.content}</div>;
                }
              })}
            </div>
          </>
        )}
        {label.find((elt) => elt.label === 'اكتب في الفراغات ')?.label && (
          <>
            <div className="wrapper-fillintheblanks">
              {arrayWriteInTheBlanks.map((word) => {
                if (word.ishidden === false) {
                  return <div className="fillintheblanks-block">{word.content}</div>;
                }
              })}
            </div>
            <div className="wrapper-fillintheblanks-hidden-words">
              {arrayWriteInTheBlanks.map((word) => {
                if (word.ishidden === true) {
                  return <div className="fillintheblanks-hidden-words-block">{word.content}</div>;
                }
              })}
            </div>
          </>
        )}
        {label.find((elt) => elt.label === 'توصيل البطاقات')?.label && (
          <>
            <div className="drag-and-drop">
              {questionsDrag.map((el) => (
                <div className="big-drag">
                  <div className="wrapper-drag-answers">
                    <div className="drag">
                      <div className="drag-title">{el.content}</div>
                    </div>
                    <div className="drop">
                      <div className="drop-icon">{/* <img src={icon} /> */}</div>
                      <div className="drop-title">اسحب هنا</div>
                    </div>
                  </div>
                </div>
              ))}
              {answersDrag.map((el) => (
                <div className="answer">
                  <div className="answer-text">{el.content}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {label.find((elt) => elt.label === 'اجراء محادثة')?.label && blockId === 'conversationBlock'
          ? speeches.map((person, idx) => {
              if (person.personId % 2 === 0) {
                return (
                  <div style={{ display: 'flex', gap: '10px' }} key={idx}>
                    <div className="img-label-wrapper">
                      <img
                        src={selectedPerson.find((elt) => elt.id === person.personId)?.avatar}
                        alt="person-image"
                        id="person-image"
                      />
                      <span style={{ margin: 'auto' }}>
                        {selectedPerson.find((elt) => elt.id === person.personId)?.name}
                      </span>
                    </div>
                    <div id="right-dialog">
                      <div className="input-audio-wrapper">
                        <div className="text" dir="ltr">
                          {person.words.map((word, index) => {
                            return (
                              <div key={word.wordposition} className="person-discussion">
                                {'' + word?.content}&nbsp;
                              </div>
                            );
                          })}
                        </div>
                        {blockId === 'conversationBlock' && (
                          <audio src={speakerId === person.personId ? file : null} controls />
                        )}
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div style={{ display: 'flex', gap: '10px' }} key={idx}>
                    <div id="left-dialog">
                      <div className="input-audio-wrapper">
                        <div className="text" dir="ltr">
                          {' '}
                          {person.words.map((word, index) => {
                            return (
                              <div key={word.wordposition} className="person-discussion">
                                {' ' + word?.content}&nbsp;
                              </div>
                            );
                          })}
                        </div>
                        {blockId === 'conversationBlock' && (
                          <audio src={speakerId === person.personId ? file : null} controls />
                        )}
                      </div>
                    </div>
                    <div className="dialog-img-label-wrapper">
                      <img
                        src={selectedPerson.find((elt) => elt.id === person.personId)?.avatar}
                        alt="person-image"
                        id="person-image"
                      />
                      <span style={{ margin: 'auto' }}>
                        {selectedPerson.find((elt) => elt.id === person.personId)?.name}
                      </span>
                    </div>
                  </div>
                );
              }
            })
          : (blockId === 'secondDialogblock'
              ? speeches2
              : blockId === 'dialogBuilderBlock'
              ? speeches3
              : speeches2
            ).map((person, idx) => {
              if (person.personId % 2 === 0) {
                return (
                  <div style={{ display: 'flex', gap: '10px' }} key={idx}>
                    <div className="img-label-wrapper-speeches2and3">
                      <img
                        src={selectedPerson.find((elt) => elt.id === person.personId)?.avatar}
                        alt="person-image"
                        id="person-image"
                      />
                      <span style={{ margin: 'auto' }}>
                        {selectedPerson.find((elt) => elt.id === person.personId)?.name}
                      </span>
                    </div>
                    <div id="right-dialog">
                      <div className="text" dir="ltr">
                        {'' + person?.content}&nbsp;
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div style={{ display: 'flex', gap: '10px' }} key={idx}>
                    <div id="left-dialog">
                      <div className="text" dir="ltr">
                        {' ' + person?.content}&nbsp;
                      </div>
                    </div>

                    <div className="img-label-wrapper-speeches2and3">
                      <img
                        src={selectedPerson.find((elt) => elt.id === person.personId)?.avatar}
                        alt="person-image"
                        id="person-image"
                      />
                      <span style={{ margin: 'auto' }}>
                        {selectedPerson.find((elt) => elt.id === person.personId)?.name}
                      </span>
                    </div>
                  </div>
                );
              }
            })}
        <Column
          column={columns}
          columnId={'tomrrow'}
          onSortEnd={onSortEnd}
          height={'600px'}
          showdragbtn={false}
          imgclassNameid={'img'}
        />
      </div>
      <div className="prev-next-wrapper">
        <div className="prev">
          السابق
          <button>
            <ArrowForwardIosIcon fontSize="small" />
          </button>
        </div>
        <div className="next">
          <button>
            <ArrowBackIosNewIcon fontSize="small" style={{ color: '#B8B8B8' }} />
          </button>
          اللاحق
        </div>
      </div>
    </div>
  );
};

export default Item2;
