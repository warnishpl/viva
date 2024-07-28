import React from 'react';
import PropTypes from 'prop-types';
import { isBeforeMidnight } from '../../utils/helpers/isBeforeToday';
import { formatDateTime } from '../../utils/helpers/formatDateTime';
import { ButtonsContainer, ColumnWrapper, DataWrapper, ItemContainer} from './EquipmentItem.styled';
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
			{(() => {
				const tutorId = selectedTutor ? selectedTutor : item.tutorId;
				const tutorName = selectedTutor ? (
					<p style={{color: 'transparent'}}>x</p>
				) : (
					<p>Tutor: {item.tutorName}</p>
				);

				return (
					<>
						<DataWrapper>
							<ColumnWrapper>
								{tutorName}
								<p>Nazwa: {item.name}</p>
							</ColumnWrapper>
							<ColumnWrapper>
								<p>Ilość: {item.quantity}</p>
								<p>
									Data wypożyczenia:{' '}
									<span
										style={{
											color: isBeforeMidnight(item.date) ? 'red' : 'black',
										}}
									>
										{formatDateTime(item.date)}
									</span>
								</p>
							</ColumnWrapper>
						</DataWrapper>
						<ButtonsContainer>
							<ChangeQuantityButton
								item={item}
								tutorsList={tutorsList}
								setTutorsList={setTutorsList}
								selectedTutor={tutorId}
							/>
							<RemoveItemButton
								removeItem={removeItem}
								selectedTutor={tutorId}
								itemId={item.id}
							/>
							<TransferButton
								item={item}
								tutorsList={tutorsList}
								setTutorsList={setTutorsList}
								selectedTutor={tutorId}
							/>
						</ButtonsContainer>
					</>
				);
			})()}
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
