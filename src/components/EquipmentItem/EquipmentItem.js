import React from 'react';
import PropTypes from 'prop-types';
import { isBeforeMidnight } from '../../utils/helpers/isBeforeToday';
import { formatDateTime } from '../../utils/helpers/formatDateTime';
import { ButtonsContainer, ItemContainer } from './EquipmentItem.styled';
import ChangeQuantityButton from '../ChangeQuantityButton/ChangeQuantityButton';
import { RemoveItemButton } from '../RemoveItemButton/RemoveItemButton';
import TransferButton from '../TransferButton/TransferButton';

const EquipmentItem = ({
	item,
	selectedTutor,
	tutorsList,
	setTutorsList,
	removeItem,
}) => {
	return (
		<ItemContainer>
			{selectedTutor ? (
				<>
					<span>Nazwa: {item.name}</span>
					<span>Ilość: {item.quantity}</span>
					<p>
						Data wypożyczenia:{' '}
						<span
							style={{ color: isBeforeMidnight(item.date) ? 'red' : 'black' }}
						>
							{formatDateTime(item.date)}
						</span>
					</p>
					<ButtonsContainer>
						<ChangeQuantityButton
							item={item}
							tutorsList={tutorsList}
							setTutorsList={setTutorsList}
							selectedTutor={selectedTutor}
						/>
						<RemoveItemButton
							removeItem={removeItem}
							selectedTutor={selectedTutor}
							itemId={item.id}
						/>
						<TransferButton
							item={item}
							tutorsList={tutorsList}
							setTutorsList={setTutorsList}
							selectedTutor={selectedTutor}
						/>
					</ButtonsContainer>
				</>
			) : (
				<>
					<p>Tutor: {item.tutorName}</p>
					<p>Nazwa: {item.name}</p>
					<p>Ilość: {item.quantity}</p>
					<p>
						Data wypożyczenia:{' '}
						<span
							style={{ color: isBeforeMidnight(item.date) ? 'red' : 'black' }}
						>
							{formatDateTime(item.date)}
						</span>
					</p>
					<ButtonsContainer>
						<ChangeQuantityButton
							item={item}
							tutorsList={tutorsList}
							setTutorsList={setTutorsList}
							selectedTutor={item.tutorId}
						/>
						<RemoveItemButton
							removeItem={removeItem}
							selectedTutor={selectedTutor}
							itemId={item.id}
						/>
						<TransferButton
							item={item}
							tutorsList={tutorsList}
							setTutorsList={setTutorsList}
							selectedTutor={item.tutorId}
						/>
					</ButtonsContainer>
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
