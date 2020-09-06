import React from 'react';
import { connect } from 'react-redux';
import { updateFrom } from './store/actions/forms';
import { IFormValues } from './interfaces/form';

const mapDispatchToDeleteConfirmProps = (dispatch: any) => ({
  updateDeleteForm: (value: IFormValues) => dispatch(updateFrom('deleteCurrent', value)),
});

type IDeleteConfirmProps = ReturnType<typeof mapDispatchToDeleteConfirmProps>;

const DeleteConfirm = connect(null, mapDispatchToDeleteConfirmProps)(
  ({ updateDeleteForm }: IDeleteConfirmProps) => (
    <div>
      <button type="button" onClick={() => updateDeleteForm({ cancel: true })}>Cancel</button>
      <button type="button" onClick={() => updateDeleteForm({ confirm: true })}>Confirm</button>
    </div>
  ),
);

export const modalComponents = {
  deleteConfirm: () => <DeleteConfirm />,
};

export type IModalComponentKeys = keyof typeof modalComponents | '' | undefined;
