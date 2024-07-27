import React from 'react';
import PropTypes from 'prop-types';
import { isBeforeMidnight } from '../utils/helpers/isBeforeToday';
import { formatDateTime } from '../utils/helpers/formatDateTime';
import ChangeQuantityButton from './ChangeQuantityButton';
import TransferButton from './TransferButton';
import { ItemContainer } from './AssignedEquipmentList.styled';

const EquipmentItem = ({
  item,
  selectedTutor,
  tutorsList,
  setTutorsList,
  removeItem
}) => {
  return (
    <ItemContainer>
      {selectedTutor ? (
        <>
          <span>Nazwa: {item.name}</span>
          <span>Ilość: {item.quantity}</span>
          <p>
            Data wypożyczenia:{' '}
            <span style={{ color: isBeforeMidnight(item.date) ? 'red' : 'black' }}>
              {formatDateTime(item.date)}
            </span>
          </p>
          <div className='button-container'>
            <ChangeQuantityButton
              item={item}
              tutorsList={tutorsList}
              setTutorsList={setTutorsList}
              selectedTutor={selectedTutor}
            />
            <button onClick={() => removeItem(selectedTutor, item.id)}>
              Usuń z listy
            </button>
            <TransferButton
              item={item}
              tutorsList={tutorsList}
              setTutorsList={setTutorsList}
              selectedTutor={selectedTutor}
            />
          </div>
        </>
      ) : (
        <>
          <p>Tutor: {item.tutorName}</p>
          <p>Nazwa: {item.name}</p>
          <p>Ilość: {item.quantity}</p>
          <p>
            Data wypożyczenia:{' '}
            <span style={{ color: isBeforeMidnight(item.date) ? 'red' : 'black' }}>
              {formatDateTime(item.date)}
            </span>
          </p>
          <div className='button-container'>
            <ChangeQuantityButton
              item={item}
              tutorsList={tutorsList}
              setTutorsList={setTutorsList}
              selectedTutor={item.tutorId}
            />
            <button onClick={() => removeItem(item.tutorId, item.id)}>
              Usuń z listy
            </button>
            <TransferButton
              item={item}
              tutorsList={tutorsList}
              setTutorsList={setTutorsList}
              selectedTutor={item.tutorId}
            />
          </div>
        </>
      )}
    </ItemContainer>
  );
};

EquipmentItem.propTypes = {
  item: PropTypes.object.isRequired,
  selectedTutor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tutorsList: PropTypes.array.isRequired,
  setTutorsList: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default EquipmentItem;
