import React from 'react';
import './_regulations.scss';
import Input from './../Input/Input';
const Regulations = (props) => {
  const { data, name } = props;
  return (
    <>
      {data.map((item, index) => {
        if (item.label === name) {
          return (
            <Input
              key={index}
              name={name}
              label={item.label}
              placeholder={item.placeholder}
              img={item.img}
              withoutimg={true}
            />
          );
        }
      })}
    </>
  );
};

export default Regulations;
