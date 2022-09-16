import React, { useState } from 'react';
import './_originator.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RegulationsBlock from './RegulationsBlock/RegulationsBlock';
import data from './../../utilities/constants';
import './../../components/Button/_taButton.scss';
import ConstructionBlock from './ConstructionBlock/ConstructionBlock';
import ViewBlock from './ViewBlock/ViewBlock';
import { fetchQuestionBlockType } from './../../slices/questionBlockTypes';
const Originator = () => {
  const dispatch = useDispatch();
  const { questionBlockType } = useSelector((state) => state.questionblocktype);
  const [columns, setColumns] = useState(questionBlockType);
  useEffect(() => {
    dispatch(fetchQuestionBlockType());
  }, [dispatch]);
  useEffect(() => {
    setColumns(questionBlockType);
  }, [questionBlockType]);
  return (
    <div className="originator">
      <ConstructionBlock columns={columns} />
      <ViewBlock />
      <RegulationsBlock data={data} />
    </div>
  );
};
export default Originator;
