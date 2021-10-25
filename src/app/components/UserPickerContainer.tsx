import { connect } from 'react-redux';
import { State } from '../types';
import { getUsers } from '../selectors';
import { Picker, PickerProps } from '../../utils/Picker';
import { User } from '../../users/types';
import { ComponentType, ComponentProps } from 'react';

const UserPicker = Picker as ComponentType<PickerProps<User>>;

type UserPickerProps = ComponentProps<typeof UserPicker>;

type UserPickerContainerStateProps = Pick<UserPickerProps, 'items'>;

type UserPickerContainerDispatchProps = Required<Pick<UserPickerProps, never>>;

type UserPickerContainerOwnProps = Omit<
  UserPickerProps,
  keyof UserPickerContainerStateProps | keyof UserPickerContainerDispatchProps
>;

export const UserPickerContainer = connect<
  UserPickerContainerStateProps,
  UserPickerContainerDispatchProps,
  UserPickerContainerOwnProps,
  State
>(state => ({
  items: getUsers(state),
}))(UserPicker);
