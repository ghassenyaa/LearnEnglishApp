import React from 'react';
import { Card } from '@material-ui/core';
import './_users.scss';
import { useSelector } from 'react-redux';
const Details = () => {
  const { id, image, full_name, tel, adresseMail, createdAt } = useSelector(
    (state) => state.users.storedData
  );
  return (
    <div className="user_detail">
      <div>
        <div className="card_header_detail">
          <img src={image} alt="photo_detail_user" className="photo_detail_user" />
          <div className="full_name_detail_user">{full_name}</div>
        </div>
      </div>
      <div>
        <Card className="card_body_details">
          <div className="personal_info_user">المعلومات الشخصية</div>
          <div className="detail_body_user">
            <span className="title_info_user">المعرف:</span>
            <span className="info_user_item">{id}</span>
          </div>
          <div className="detail_body_user">
            <span className="title_info_user">الاسم و اللقب:</span>
            <span className="info_user_item">{full_name}</span>
          </div>
          <div className="detail_body_user">
            <span className="title_info_user">الهاتف:</span>
            <span className="info_user_item">{tel}</span>
          </div>
          <div className="detail_body_user">
            <span className="title_info_user">البريد الالكتروني:</span>
            <span className="info_user_item">{adresseMail}</span>
          </div>
          <div className="detail_body_user">
            <span className="title_info_user">تاريخ صنع المستعمل :</span>
            <span className="info_user_item">{createdAt}</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Details;
