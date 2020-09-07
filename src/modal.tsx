import React from 'react';
import { connect } from 'react-redux';
import { updateFrom } from './store/actions/forms';
import { IFormValues } from './interfaces/form';

import Button from './components/Button';

const mapDispatchToDeleteConfirmProps = (dispatch: any) => ({
  updateDeleteForm: (value: IFormValues) => dispatch(updateFrom('deleteCurrent', value)),
});

type IDeleteConfirmProps = ReturnType<typeof mapDispatchToDeleteConfirmProps>;

const DeleteConfirm = connect(null, mapDispatchToDeleteConfirmProps)(
  ({ updateDeleteForm }: IDeleteConfirmProps) => (
    <div>
      <Button
        onClick={() => updateDeleteForm({ cancel: true })}
        noBackground
        noShadow
      >
        Cancel
      </Button>
      <Button
        onClick={() => updateDeleteForm({ confirm: true })}
        noShadow
      >
        Confirm
      </Button>
    </div>
  ),
);

export const modalComponents = {
  deleteConfirm: () => <DeleteConfirm />,
};

export type IModalComponentKeys = keyof typeof modalComponents | '' | undefined;
